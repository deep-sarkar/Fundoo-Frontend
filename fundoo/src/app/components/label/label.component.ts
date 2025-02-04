import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/dataService/data.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit, OnDestroy {

  constructor(
    private _dataService:DataService,
    private _utility:UtilityService
  ) { }

  newLabel = new FormControl('')
  allLabels:object[]
  subscription: Subscription;


  createLabel(){
    let labelData ={
      label:this.newLabel.value
    }
    this.subscription = this._dataService.createLabel(labelData)
    .subscribe(
      response =>{
        if(response['code']==201){
          this._utility.snackBarMessage("New label created")
          this.getAllLabel()
          //after creating label form control will be empty
          this.newLabel = new FormControl("")
        }else{
          this._utility.snackBarMessage(response["msg"])
        }
      },
      error =>{
        console.log("error",error)
      }
    )
  }

  deleteLabel(id:number){
    this._dataService.deleteLabel(id)
    .subscribe(
      response =>{
        // console.log(response)
        if(response["code"]==200){
          this._utility.snackBarMessage("label deleted !!!")
          this.getAllLabel()
        }
      },
      error =>{
        console.log("error",error)
      }
    )
  }

  getAllLabel(){
    this._dataService.getLabel()
    .subscribe(
      response =>{
        // console.log(response)
        if(response["code"]==200){
           this.allLabels=response["data"]
          //  console.log(this.allLabels)
        }
       
      }
    )
  }

  ngOnInit() {
    this.getAllLabel()
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
}
