import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email = new FormControl("",[
    Validators.required,
    Validators.email
  ])

  emailErrorMsg(){
    return this.email.hasError('required')?"Please enter email for recovery.":
      this.email.hasError('email')?"enter valid email.":"please check your email after submit"
  }


  constructor() { }

  ngOnInit() {
  }

}
