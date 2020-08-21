import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { error } from 'console';
import { ForgotPasswordService } from 'src/app/services/accountServices/forgot-password.service';
import { RegisterService } from 'src/app/services/accountServices/register.service';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private sendmail:ForgotPasswordService,
    private _validationService:ValidateFormFieldService) { }

  email = new FormControl("",[
    Validators.required,
    Validators.email
  ])

  recoveryMail:object;

  emailErrorMsg(){
    return this._validationService.emailErrorMsg(this.email)
  }

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
