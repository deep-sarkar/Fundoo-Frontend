import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/dataService/data.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  constructor(
    private _dataService:DataService,
    private _utility:UtilityService
  ) { }

  newLabel = new FormControl('')
  
  createLabel(){
    let labelData ={
      label:this.newLabel.value
    }
    this._dataService.createLabel(labelData)
    .subscribe(
      response =>{
        if(response['code']==201){
          this._utility.snackBarMessage("New label created")
        }else{
          this._utility.snackBarMessage(response["msg"])
        }
      },
      error =>{
        console.log("error",error)
      }
    )
  }


  ngOnInit() {
  }
}
