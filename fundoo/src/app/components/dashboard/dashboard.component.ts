import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';
import { LabelComponent } from '../label/label.component';
import jwt_decode from 'jwt-decode'
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _utility: UtilityService,
    private _accountService: AccountHttpService
  ) {
    _utility.viewClass
      .subscribe(
        result => {
          if (result === "main-container-grid") {
            this.isGrid = true
          } else {
            this.isGrid = false
          }
        }
      )
  }

  username: string = ''

  isGrid: boolean = true;

  getUsername() {
    if (this._accountService.isLoggedIn()) {
      let decode = jwt_decode(localStorage.getItem('token'))
      let uname = decode['username']
      this.username = uname.substr(0,2).toUpperCase()
      // console.log(decode)
    }
  }

  gridView() {
    this.isGrid = true
    this._utility.viewClass.next("main-container-grid")
  }

  listView() {
    this.isGrid = false
    this._utility.viewClass.next("main-container-list")
  }

  home() {
    this._dialog.open(HomeComponent,{
      width:"240px",
      position:{top:"63px", right:'5px'}
    })
  }

  createNote() {
    this._utility.searchItem.next('')
    this._router.navigate(['create'])
  }

  openLabel() {
    let labelRef = this._dialog.open(LabelComponent, {
      position: { top: "5%" },
      minWidth: "20%",
      minHeight: "10vh",
      height: "auto",
      maxHeight: "85vh",
      disableClose: true,
      panelClass: 'label-dialog'
    })
  }

  reminderNote() {
    this._router.navigate(['reminder'])
  }

  archivesNote() {
    this._router.navigate(['archives'])
  }

  trashNotes() {
    this._router.navigate(["trash"])
  }

  ngOnInit() {
    this.createNote()
    this.getUsername()
  }

}
