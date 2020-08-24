import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from '../genericService/generic.service';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  constructor(private _http:GenericService) { }
  
  baseUrl = environment.accountUrl

  token = localStorage.getItem('token')

  changePassword(data:object){
    console.log("token",this.token)
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+this.token})
    
    return this._http.postService(this.baseUrl + "change_password/", data, {headers:headers})
  }

  sendRecoveryMail(email:object){
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
      )

    return this._http.postService(this.baseUrl + "forgot_password/",email,{headers:headers})
  }

  userLogin(data:object){
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
      )
      
    return this._http.postService(this.baseUrl + "login/", data, {headers:headers})
  }

  registerNewUser(userData:object){
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
      )
    return this._http.postService(this.baseUrl + "register/", userData,{headers:headers})
  }

  activateAccount(surl:string){
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
      )
    return this._http.getService(this.baseUrl + "activate/" + surl, {headers:headers})
  }

  checkUserExistance(surl:string){
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
    )
    return this._http.getService(this.baseUrl+"check_user/" + surl, {headers:headers})
  }

  resetPassword(user_data:object){
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
    )
    return this._http.postService(this.baseUrl+"reset_paassword/" , user_data, {headers:headers})
  }

}
