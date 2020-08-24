import { Component, OnInit } from '@angular/core';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/services/utilityService/utility.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  constructor( 
    private _httpService:AccountHttpService,
    private _route:ActivatedRoute,
    private _snackBar:UtilityService
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
          }else{
            this._snackBar.snackBarMessage(response['msg'])
          }
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
