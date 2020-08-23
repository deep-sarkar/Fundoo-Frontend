import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  constructor(private _http:HttpClient) { }
  
  baseUrl = environment.accountUrl

  token = localStorage.getItem('token')

  changePassword(data){
    console.log("token",this.token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "JWT"+this.token
    })

    return this._http.post(this.baseUrl + "change_password/", data, {headers:{
      "Content-Type": "application/json",
      "Authorization": "JWT "+this.token,
    }})
  }

  sendRecoveryMail(email){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post(this.baseUrl + "forgot_password/",email)
  }

  userLogin(data){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post(this.baseUrl + "login/", data)
  }

  registerNewUser(userData){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post(this.baseUrl + "register/", userData)
  }

  activateAccount(surl){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.get(this.baseUrl + "activate/"+surl)
  }
}
