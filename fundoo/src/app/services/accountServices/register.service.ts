import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerNewUser(userData){
    // const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post("http://127.0.0.1:8000/accounts/register/", userData)
  }
}
