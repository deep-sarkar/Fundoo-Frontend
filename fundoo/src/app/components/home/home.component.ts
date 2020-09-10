
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode'
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _route:Router,
    private _accountService:AccountHttpService,
    private _utility:UtilityService
    ) { }
    
  token = localStorage.getItem("token")
  
  username:string;
  

  register(){
    this._route.navigate(['register'])
  }

  login(){
    this._route.navigate(['login'])
  }
 
  notes(){
    this._route.navigate([''])
  }

  changePassword(){
    this._route.navigate(['changePassword'])
    console.log(1111)
  }

  logout(){
    this._accountService.logout()
    .subscribe(
      response => {
        console.log(response)
        if(response['code']===200){
          localStorage.removeItem("token")
          this._utility.snackBarMessage("Logout successfull")
          this._route.navigate(["home"])
          console.log(this.token)
        }
      },
      error =>{
        console.log("error",error)
      }
    )
  }

  getUsername(){
    if(this.token != null){
      let decode = jwt_decode(this.token)
      // console.log(decode)
      this.username = decode['username']
    }
  }

  ngOnInit() {
    this.getUsername()
    console.log(this.token)
  }

}
