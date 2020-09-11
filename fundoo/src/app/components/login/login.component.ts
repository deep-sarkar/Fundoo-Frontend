import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data:object;

  constructor(
    private _httpService:AccountHttpService, 
    private _validationService:ValidateFormFieldService,
    private _snackBar:UtilityService,
    private _route: Router
    ) { }

  username = new FormControl('',[
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9]{4,}$"))

  ])
  password = new FormControl('',[
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9]{8,}$"))
  ])

  usernameErrorMsg(){
    return this._validationService.usernameErrorMsg(this.username)
  }

  passwordErrorMsg(){
    return this._validationService.passwordErrorMsg(this.password)
  }

  loginUser(){
    this.data = {
      username:this.username.value,
      password:this.password.value
    }
    this._httpService.userLogin(this.data)
    .subscribe(
      response=> {
        if(response['code']===200){
          this._snackBar.snackBarMessage("Hello , "+this.username.value)
          localStorage.setItem('token',response['token'])
          if(this._httpService.isLoggedIn()){
            this._route.navigate([''])
          }
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
