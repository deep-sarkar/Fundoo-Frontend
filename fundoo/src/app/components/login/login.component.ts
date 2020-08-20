import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  username = new FormControl('',[
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9]{4,}$"))

  ])
  password = new FormControl('',[
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9]{8,}$"))
  ])

  usernameErrorMsg(){
    return this.username.hasError('required')?"enter username":
    this.username.hasError('pattern')?"username must have atlest 4 digit, alphabet and numbers accepted only":"";
  }

  passwordErrorMsg(){
    return this.password.hasError('required')?"enter password":
    this.password.hasError('pattern')?"min. 8 digit alphanumeric only":"";
  }
  ngOnInit() {
  }

}
