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
    console.log('token',token)
    console.log("success")
  }

  createNote(){
    this._router.navigate(['create'])
  }

  openLabel(){
    let labelRef = this._dialog.open(LabelComponent,{
      position:{top:"10%"},
      width:"25%",
      disableClose:true,
      height:'auto',
      maxHeight:'90%',
      panelClass:'label-dialog'
    })
  }

  ngOnInit() {
    this.createNote()
  }

}
