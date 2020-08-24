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
}
