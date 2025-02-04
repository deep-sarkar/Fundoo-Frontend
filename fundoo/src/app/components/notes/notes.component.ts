import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private _dataService:DataService) { }

  allNotes:object;
  trigger:any;
  update:any;

  getAllNotes(){
    this._dataService.getNotes()
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
    // console.log("recived",$event)
    this.getAllNotes()
  }

  getUpdatedNote($event){
    // console.log("updated")
    this.getAllNotes()
  }

  ngOnInit() {
    this.getAllNotes()
  }

}
