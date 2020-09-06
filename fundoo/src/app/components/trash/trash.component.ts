import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor(
    private _dataService:DataService
  ) { }
  
  allNotes:object;


  getAllTrashNote(){
    this._dataService.getTrash()
    .subscribe(
      respones =>{
        if(respones['code']===200){
          // console.log(respones["data"])
          this.allNotes = respones["data"]
        }
      },
      error =>{
        console.log("error",error)
      }
    )
  }

  getUpdate($event){
    if($event){
      this.getAllTrashNote()
      // console.log(this.allNotes)
    }
  }

  ngOnInit() {
    this.getAllTrashNote()
  }

}
