import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit {

  constructor(
    private _dataService:DataService
  ) { }
  
  
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

  ngOnInit() {
    this.getAllArchives()
  }

}
