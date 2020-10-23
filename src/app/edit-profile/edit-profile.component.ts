import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user_name:string;
  user: any = {};
  message: string;
  selimg:any;
  imgurl:any;
  constructor(private afs:AngularFireStorage) {
    this.getProfile();
  }

  ngOnInit() {
    
  }

  selectimg($event){
    this.selimg = $event.target.files[0];
    console.log(this.selimg);
  }

  uploadimg(){
    var imgpath = `files/${this.selimg}_${new Date().getTime()}`;
    const fileref = this.afs.ref(imgpath);
    this.afs.upload(imgpath,this.selimg).snapshotChanges().pipe(
    finalize(()=>{
      fileref.getDownloadURL().subscribe((url)=>{
        this.imgurl = url;
        console.log(this.imgurl);
      });
    })
  ).subscribe();
  }
  
  getProfile(){   
      let userId = firebase.auth().currentUser.uid;
      this.user_name = firebase.auth().currentUser.displayName;
      firebase.firestore().collection("users").doc(userId).get().then((documentSnapshot) => {      
      this.user = documentSnapshot.data();
      
      this.user.displayName = this.user.firstName + " " + this.user.lastName;
      if(this.user.displayName == null){
        this.user.displayName=this.user.displayName
      }
      this.user.id = documentSnapshot.id;
      if(this.user.photoURL==null){
        this.imgurl='assets/profile.png';
      }else{
        this.imgurl= this.user.photoURL;
      }
      console.log(this.imgurl);

    }).catch((error) => {
      console.log(error);
    })

  }

  update(){

    this.message = "Updating Profile...";

    firebase.auth().currentUser.updateProfile({
      displayName: this.user.displayName, photoURL: this.imgurl
    }).then(() => {

      let userId = firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(userId).update({
        first_name: this.user.displayName.split(' ')[0],
        last_name: this.user.displayName.split(' ')[1],
        hobbies: this.user.hobbies,
        interests: this.user.interests,
        bio: this.user.bio,
        photoURL:this.imgurl
      }).then(() => {

        this.message = "Profile Updated Successfully.";

      }).catch((error) => {
        console.log(error)
      })


    }).catch((error) => {
      console.log(error)
    })

  }

}
