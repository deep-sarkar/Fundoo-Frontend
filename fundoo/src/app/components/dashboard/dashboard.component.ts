import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
      private _router:Router,
      private _dialog:MatDialog
    ) { }

  logout(){
    localStorage.removeItem('token')
    let token=localStorage.getItem('token')
    // console.log('token',token)
    // console.log("success")
  }

  createNote(){
    this._router.navigate(['create'])
  }

  openLabel(){
    let labelRef = this._dialog.open(LabelComponent,{
      position:{top:"5%"},
      minWidth:"20%",
      minHeight:"10vh",
      height:"auto",
      maxHeight:"85vh",
      disableClose:true,
      panelClass:'label-dialog'
    })
  }
  
  reminderNote(){
    this._router.navigate(['reminder'])
  }
 
  archivesNote(){
    this._router.navigate(['archives'])
  }
  
  trashNotes(){
    this._router.navigate(["trash"])
  }
  
  ngOnInit() {
    this.createNote()
  }

}
