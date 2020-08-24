import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _httpService:AccountHttpService, 
    private _validationService:ValidateFormFieldService,
    private _snakeBar:MatSnackBar
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

  data:object;



  loginUser(){
    this.data = {
      username:this.username.value,
      password:this.password.value
    }
    this._httpService.userLogin(this.data)
    .subscribe(
      response=> {
          this._snakeBar.open(response['msg'],'exit',{duration:5000})
          localStorage.setItem('token',response['token'])
      },
      error =>{
        console.log("error",error)
      }
    )
  }


  ngOnInit() {
  }

}
