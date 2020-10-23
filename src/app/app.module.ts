import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { CapitalizePipe } from './capitalize.pipe';
import { AppRoutingModule } from './/app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
import { CommentsComponent } from './comments/comments.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

let config = {

  apiKey: "AIzaSyCkwZIWB2FvInS3K3G21oKTkKohCXwI6xY",
    authDomain: "socialblogging-5e464.firebaseapp.com",
    databaseURL: "https://socialblogging-5e464.firebaseio.com",
    projectId: "socialblogging-5e464",
    storageBucket: "socialblogging-5e464.appspot.com",
    messagingSenderId: "599211491532",
    appId: "1:599211491532:web:60ff9888192e90a37fc269",
    measurementId: "G-FJKSPK868F"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    CapitalizePipe,
    MenuComponent,
    MyblogsComponent,
    ProfileComponent,
    CreateComponent,
    PostComponent,
    ViewComponent,
    CommentsComponent,
    EditProfileComponent,
    PagenotfoundComponent,
    ForgetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularEditorModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp( {

      apiKey: "AIzaSyCkwZIWB2FvInS3K3G21oKTkKohCXwI6xY",
        authDomain: "socialblogging-5e464.firebaseapp.com",
        databaseURL: "https://socialblogging-5e464.firebaseio.com",
        projectId: "socialblogging-5e464",
        storageBucket: "socialblogging-5e464.appspot.com",
        messagingSenderId: "599211491532",
        appId: "1:599211491532:web:60ff9888192e90a37fc269",
        measurementId: "G-FJKSPK868F"
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
