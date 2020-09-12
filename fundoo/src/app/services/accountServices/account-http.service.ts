import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from '../genericService/generic.service';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  constructor(private _http:GenericService) { }
  
  // urls
  baseUrl = environment.accountUrl
  noteUrl = environment.notesUrl
  // token

  changePassword(data:object): Observable<any>{
    // console.log("token",this.token)
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
    
    return this._http.postService(this.baseUrl + "change_password/", data, {headers:headers})
  }

  sendRecoveryMail(email:object): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
      )

    return this._http.postService(this.baseUrl + "forgot_password/",email,{headers:headers})
  }

  userLogin(data:object): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
      )
      
    return this._http.postService(this.baseUrl + "login/", data, {headers:headers})
  }

  registerNewUser(userData:object): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
      )
    return this._http.postService(this.baseUrl + "register/", userData,{headers:headers})
  }

  activateAccount(surl:string): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
      )
    return this._http.getService(this.baseUrl + "activate/" + surl, {headers:headers})
  }

  checkUserExistance(surl:string): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
    )
    return this._http.getService(this.baseUrl+"check_user/" + surl, {headers:headers})
  }

  getAllUser(): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')}
      )
    return this._http.getService(this.baseUrl+"all_users/", {headers:headers})
  }

  resetPassword(user_data:object): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json"}
    )
    return this._http.postService(this.baseUrl+"reset_paassword/" , user_data, {headers:headers})
  }
  
  logout(){
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')}
      )
      // console.log("logout",this.token)
    return this._http.getService(this.baseUrl+"logout/", {headers:headers})
  }

  isLoggedIn(){
    // console.log(!!localStorage.getItem('token'))
    return !!localStorage.getItem('token')
  }

}

