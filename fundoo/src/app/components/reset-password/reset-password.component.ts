import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor( 
    private _httpService:AccountHttpService,
    private _route:ActivatedRoute,
    private _snakeBar:MatSnackBar,
    private _validationService:ValidateFormFieldService,
    ) { }

    surl:string;
    user:boolean=false;
    data:object;

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

  checkUser(){
    this.surl = this._route.snapshot.paramMap.get('surl')
    this._httpService.checkUserExistance(this.surl)
    .subscribe(
      response =>{
        if(response['code']===203){
          this.user=true;
          console.log("response",response)
        }
      },
      error =>{
        console.log('error',error)
      }
    )
  }

  resetNewPassword(){
    this.data = {
      password:this.password.value,
      confirm_password:this.confirm_password.value,
      surl:this.surl
    }
    console.log(this.data)
    console.log(this.surl)
    this._httpService.resetPassword(this.surl, this.data)
    .subscribe(
      response =>{
        this._snakeBar.open(response['msg'],'exit',{duration:5000})
      },
      error=>{
        console.log("error",error)
      }
      )
  }

  ngOnInit() {
    this.checkUser()
  }

}
