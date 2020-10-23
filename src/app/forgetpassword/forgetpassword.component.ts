import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  myForm: FormGroup;
  message: string = "";
  userError: any;
  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {

    this.myForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    })
    

   }

  ngOnInit(): void {
  }
  onSubmit(form){

    this.authService.login(form.value.email, form.value.password).then((data) => {
      console.log(data);
      this.message = "You have been logged in successfully."
      this.userError = "";

      this.router.navigate(['/myblogs'])

    }).catch((error) => {
      console.log(error);
      this.message = "";
      this.userError = error;
      console.log(this.userError);
    })

  }
}
