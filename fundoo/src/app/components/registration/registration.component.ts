import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  first_name = new FormControl('',
  [
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z]{3,}$"))
  ]);

  last_name = new FormControl('',
  [
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z]{3,}$"))
  ]);

  username = new FormControl('',
  [
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9]{4,}$"))
  ]);

  email = new FormControl('',
  [
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('',
  [
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9]{8,}$"))
  ]);

  confirm_password = new FormControl('',
  [
    Validators.required
  ]);

  firstNameErrorMsg(){
    return this.first_name.hasError('required')?"enter first name":
    this.first_name.hasError('pattern')?"atlest 3 charecters & alphabet only":"";
  }

  lastNameErrorMsg(){
    return this.last_name.hasError('required')?"enter last name":
    this.last_name.hasError('pattern')?"atlest 3 charecters & alphabet only":"";
  }

  usernameErrorMsg(){
    return this.username.hasError('required')?"enter username":
    this.username.hasError('pattern')?"username must have atlest 4 digit, alphabet and numbers accepted only":"";
  }

  emailErrorMsg(){
    return this.email.hasError('required')?"enter email":
    this.email.hasError('email')?"please enter a valid email":
    "verify email after registeration";
  }

  passwordErrorMsg(){
    return this.password.hasError('required')?"enter password":
    this.password.hasError('pattern')?"min. 8 digit alphanumeric only":"";
  }

  confirm_passwordErrorMsg(){
    return this.password.hasError('required')?"please confirm password":""
  }

  passwordMatchError(){
    if (this.password.value != this.confirm_password.value){
      alert("Password didn't matched ")
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
