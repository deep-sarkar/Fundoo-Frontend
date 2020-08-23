import { Component, OnInit } from '@angular/core';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  constructor( 
    private _httpService:AccountHttpService,
    private _route:ActivatedRoute,
    private _snakeBar:MatSnackBar
    ) { }

    surl:string;

    userStatus:boolean=false;

    activateAcc(){
      this.surl=this._route.snapshot.paramMap.get('surl')
      console.log(this.surl)
      this._httpService.activateAccount(this.surl)
      .subscribe(
        response =>{
          if(response['code'] === 200){
            this.userStatus = true
          }
          this._snakeBar.open(response['msg'],"exit",{duration:4000})
          
        },
        error =>{
          console.log("error", error)
        }
      )
    
    }

  ngOnInit() {
    this.activateAcc()
  }

}
