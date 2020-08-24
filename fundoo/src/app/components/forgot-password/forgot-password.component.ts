import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private _httpService:AccountHttpService,
    private _validationService:ValidateFormFieldService,
    private _snakeBar:MatSnackBar
    ) { }

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
    return this._httpService.sendRecoveryMail(this.recoveryMail)
    .subscribe(
      response => {
        console.log(response);
        this._snakeBar.open(response['msg'],'exit',{duration:5000})
      },
      error =>{
        console.log("error",error)
      }
    )
  }


  ngOnInit() {
  }

}
