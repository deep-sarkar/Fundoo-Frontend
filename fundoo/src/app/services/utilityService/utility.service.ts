import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _snackBar:MatSnackBar) { }

  viewClass = new Subject<string>()

  searchItem = new Subject<string>()

  snackBarMessage(message:string){
    return this._snackBar.open(message,"ok",{duration:5000})
  }
}
