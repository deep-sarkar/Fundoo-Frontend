import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _snackBar:MatSnackBar) { }

  snackBarMessage(message:string){
    return this._snackBar.open(message,"ok",{duration:5000})
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
