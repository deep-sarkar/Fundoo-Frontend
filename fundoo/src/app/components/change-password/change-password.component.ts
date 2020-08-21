import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private _validationService:ValidateFormFieldService,
    private _httpService:AccountHttpService
    ) { }

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

  onSubmit(){
    if(this.password.value!== this.confirm_password.value){
      alert("Password didn't matched")
    }else{
      this.data = {
        password:this.password.value,
        confirm_password:this.confirm_password.value
      }
      console.log(this.data)
      this._httpService.changePassword(this.data)
      .subscribe(
        response => {
          console.log(response)
          alert(response['msg'])
        },
        error=>{
          console.log("error",error)
        }
      )
    }
  }

  ngOnInit() {
  }

}
