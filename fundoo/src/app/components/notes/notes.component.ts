import { Component, OnInit } from '@angular/core';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private _httpService:AccountHttpService) { }

  allNotes:object;
  trigger:any;

  getAllNotes(){
    this._httpService.getNotes()
    .subscribe(
      response =>{
        if (response['code']==200){
          this.allNotes = response['data']
        }
      },
      error =>{
        console.log('error',error)
      }
    )
  }

  reciveTrigger($event){
    console.log("recived",$event)
    this.getAllNotes()
  }

  ngOnInit() {
    this.getAllNotes()
  }

}
