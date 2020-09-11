import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AccountHttpService } from '../services/accountServices/account-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private _accountService : AccountHttpService,
    private _route : Router
  ){ 

  }
  
  canActivate():boolean{
    if(this._accountService.isLoggedIn()){
      this._route.navigate['']
      return true
    } else {
      this._route.navigate(['login'])
      return false
    }
  }


}
