import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  constructor(private _http:HttpClient) { }
  
  changePassword(data){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post("http://127.0.0.1:8000/accounts/change_password/", data)
  }

  sendRecoveryMail(email){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post("http://127.0.0.1:8000/accounts/forgot_password/",email)
  }

  userLogin(data){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post("http://127.0.0.1:8000/accounts/login/", data)
  }

  registerNewUser(userData){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post("http://127.0.0.1:8000/accounts/register/", userData)
  }
}
