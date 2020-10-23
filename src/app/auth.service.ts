import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import 'firebase/auth';
import { User } from "./user";
import { auth } from 'firebase/app';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone
  ) { }
  userData: any;
  login(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string, first_name: string, last_name: string,purl:string){
    return new Promise((resolve, reject) => {

      
      firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
        response.user.updateProfile({
          displayName: first_name + " " + last_name,
          photoURL: purl
        }).then(() => {
          resolve(response.user);
        }).catch((error) => {
          reject(error);
        })

      }).catch((error) => {
        reject(error);
      })

    })
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

 

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['myblogs']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
    return userRef.set(userData, {
      merge: true
    })
  }
}
