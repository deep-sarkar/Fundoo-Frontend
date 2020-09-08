import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateFormFieldService {

  constructor() { }

  firstNameErrorMsg(first_name){
    return first_name.hasError('required')?"enter first name":
    first_name.hasError('pattern')?"atlest 3 charecters & alphabet only":"";
  }

  lastNameErrorMsg(last_name){
    return last_name.hasError('required')?"enter last name":
    last_name.hasError('pattern')?"atlest 3 charecters & alphabet only":"";
  }

  usernameErrorMsg(username){
    return username.hasError('required')?"enter username":
    username.hasError('pattern')?"username must have atlest 4 digit, alphabet and numbers accepted only":"";
  }

  emailErrorMsg(email){
    return email.hasError('required')?"enter email":
    email.hasError('email')?"please enter a valid email":
    "verify email after registeration";
  }

  passwordErrorMsg(password){
    return password.hasError('required')?"enter password":
    password.hasError('pattern')?"min. 8 digit alphanumeric only":"";
  }

  confirm_passwordErrorMsg(confirm_password){
    return confirm_password.hasError('required')?"please confirm password":""
  }
  
  validateReminder(reminder:string){
    //check and validation for reminder
      let now = new Date()
      let nowHr = now.getHours()
      let nowMin = now.getMinutes()
      let reminderTime = reminder.split(":")
      if(parseInt(reminderTime[0])==nowHr 
      && parseInt(reminderTime[1])>nowMin
      || parseInt(reminderTime[0])>nowHr)
      {
        return true
      }
      return false
  }
}
