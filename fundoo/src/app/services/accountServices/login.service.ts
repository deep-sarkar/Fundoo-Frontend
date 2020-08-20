import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient ) { }
  userLogin(data){
    return this.http.post("http://127.0.0.1:8000/accounts/login/", data)
  }
}
