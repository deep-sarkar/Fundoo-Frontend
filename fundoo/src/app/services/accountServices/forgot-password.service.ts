import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  sendRecoveryMail(email){
    return this.http.post("http://127.0.0.1:8000/accounts/forgot_password/",email)
  }
}
