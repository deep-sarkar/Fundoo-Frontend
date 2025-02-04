import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private _httpServis:AccountHttpService, 
    private _validationService:ValidateFormFieldService,
    private _snackBar:UtilityService
    ) { }
    
  first_name = new FormControl('',
  [
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z]{3,}$"))
  ]);

  last_name = new FormControl('',
  [
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z]{3,}$"))
  ]);

  username = new FormControl('',
  [
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9]{4,}$"))
  ]);

  email = new FormControl('',
  [
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('',
  [
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9]{8,}$"))
  ]);

  confirm_password = new FormControl('',
  [
    Validators.required
  ]);
  userData:object;
  

  firstNameErrorMsg(){
    return this._validationService.firstNameErrorMsg(this.first_name)
  }

  lastNameErrorMsg(){
    return this._validationService.lastNameErrorMsg(this.last_name)
  }

  usernameErrorMsg(){
    return this._validationService.usernameErrorMsg(this.username)
  }

  emailErrorMsg(){
    return this._validationService.emailErrorMsg(this.email)
  }

  passwordErrorMsg(){
    return this._validationService.passwordErrorMsg(this.password)
  }

  confirm_passwordErrorMsg(){
    return this._validationService.confirm_passwordErrorMsg(this.confirm_password)
  }

  registerNewUser(){
    if (this.password.value != this.confirm_password.value){
      alert("Password didn't matched ")
    }
    else{
      this.userData = {
        first_name:this.first_name.value,
        last_name:this.last_name.value,
        username:this.username.value,
        email:this.email.value,
        password:this.password.value,
        confirm_password:this.confirm_password.value
      }
      // console.log(this.userData)
      this._httpServis.registerNewUser(this.userData)
      .subscribe(
        (response) =>{
          if(response['code']===201){
            this._snackBar.snackBarMessage(this.username.value+" "+ " Account created ! Please check your mail box.")
          }else{
            this._snackBar.snackBarMessage(response['msg'])
          }
          
        },
        error =>{
          console.log("error",error)
        }
      )
    }
  }

  ngOnInit() {
  }

}
