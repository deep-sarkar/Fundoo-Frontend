import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';
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
    private _snackBar:UtilityService
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
        if(response['code']==200){
          this._snackBar.snackBarMessage("Mail sent !!! please check your email.")
        }else{
          this._snackBar.snackBarMessage(response['msg'])
        }
        
      },
      error =>{
        console.log("error",error)
      }
    )
  }


  ngOnInit() {
  }

}
