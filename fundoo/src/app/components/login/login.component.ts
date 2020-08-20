import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { error } from 'console';
import { LoginService } from 'src/app/services/accountServices/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = new FormControl('',[
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9]{4,}$"))

  ])
  password = new FormControl('',[
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9]{8,}$"))
  ])

  usernameErrorMsg(){
    return this.username.hasError('required')?"enter username":
    this.username.hasError('pattern')?"username must have atlest 4 digit, alphabet and numbers accepted only":"";
  }

  passwordErrorMsg(){
    return this.password.hasError('required')?"enter password":
    this.password.hasError('pattern')?"min. 8 digit alphanumeric only":"";
  }

  data:object;

  constructor(private loginService:LoginService) { }

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
