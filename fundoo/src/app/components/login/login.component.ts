import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { error } from 'console';
import { LoginService } from 'src/app/services/accountServices/login.service';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, 
    private _validationService:ValidateFormFieldService) { }

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
    this.loginService.userLogin(this.data).subscribe(
      response=> {
          alert(response['msg'])
      },
      error =>{
        console.log("error",error)
      }
    )
  }


  ngOnInit() {
  }

}
