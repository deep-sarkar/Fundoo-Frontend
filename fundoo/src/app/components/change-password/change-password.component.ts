import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private _validationService:ValidateFormFieldService) { }

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

  ngOnInit() {
  }

}
