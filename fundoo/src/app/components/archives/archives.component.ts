import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit {

  constructor(
    private _dataService:DataService,
    private _utility:UtilityService
  ) { 
    _utility.viewClass.next("main-container-grid")
  }
  
  
  allNotes:object;
  
  getAllArchives(){
    this._dataService.getArchives()
    .subscribe(
      response =>{
        if(response['code']==200){
          this.allNotes = response["data"]
        }else{
          console.log(response)
        }
      },
      error =>{
        console.log("error",error)
      }
    )
  }

  getUpdate($event){
    if($event){
      this.getAllArchives()
      // console.log(this.allNotes)
    }
  }

  reciveTrigger($event){
    console.log($event)
    this.getAllArchives()
  }

  ngOnInit() {
    this.getAllArchives()
  }

}
