import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  data:object;

  constructor(
    private _validationService:ValidateFormFieldService,
    private _httpService:AccountHttpService,
    private _snackBar:UtilityService,
    private _route:Router
    ) { }

  password = new FormControl('',
  [
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9]{8,}$"))
  ]);

  confirm_password = new FormControl('',
  [
    Validators.required
  ]);

  passwordErrorMsg(){
    return this._validationService.passwordErrorMsg(this.password)
  }

  confirm_passwordErrorMsg(){
    return this._validationService.confirm_passwordErrorMsg(this.confirm_password)
  }

  onSubmit(){
    if(this.password.value!== this.confirm_password.value){
      alert("Password didn't matched")
    }else{
      this.data = {
        password:this.password.value,
        confirm_password:this.confirm_password.value
      }
      // console.log(this.data)
      this._httpService.changePassword(this.data)
      .subscribe(
        response => {
          if(response['code']===200){
            localStorage.removeItem('token')
            this._route.navigate(['login'])
            this._snackBar.snackBarMessage("Password changed. Please login again to continuoue.")
          }else{
            this._snackBar.snackBarMessage(response['msg'])
          }
        },
        error=>{
          console.log("error",error)
        }
      )
    }
  }

  notes(){
    this._route.navigate([''])
  }
  ngOnInit() {
  }

}
