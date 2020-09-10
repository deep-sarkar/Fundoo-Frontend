import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utilityService/utility.service';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
      private _router:Router,
      private _dialog:MatDialog,
      private _utility:UtilityService
    ) {
      _utility.viewClass
      .subscribe(
        result =>{
          if(result==="main-container-grid"){
            this.isGrid = true
          }else{
            this.isGrid = false
          }
        }
      )
     }


  isGrid:boolean=true;

  gridView(){
    this.isGrid = true
    this._utility.viewClass.next("main-container-grid")
  }

  listView(){
    this.isGrid = false
    this._utility.viewClass.next("main-container-list")
  }

  home(){
    this._router.navigate(['home'])
  }

  createNote(){
    this._utility.searchItem.next('')
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
