import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { error } from 'console';
import { ForgotPasswordService } from 'src/app/services/accountServices/forgot-password.service';
import { RegisterService } from 'src/app/services/accountServices/register.service';

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

  recoveryMail:object;

  emailErrorMsg(){
    return this.email.hasError('required')?"Please enter email for recovery.":
      this.email.hasError('email')?"enter valid email.":"please check your email after submit"
  }

  constructor(private sendmail:ForgotPasswordService) { }

  sendMail(){
    this.recoveryMail = {email:this.email.value};
    return this.sendmail.sendRecoveryMail(this.recoveryMail).subscribe(
      response => {
        console.log(response);
        alert(response['msg']);
      },
      error =>{
        console.log("error",error)
      }
    )
  }


  ngOnInit() {
  }

}
