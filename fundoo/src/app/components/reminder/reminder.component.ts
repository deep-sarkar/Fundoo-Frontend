import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/dataService/data.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit, OnDestroy {

  constructor(
    private _dataService:DataService,
    private _utility:UtilityService
    ) {
      _utility.viewClass.next("main-container-grid")
     }

  allNotes:object;
  subscription : Subscription;

  allReminderNotes(){
    this.subscription = this._dataService.getReminder()
    .subscribe(
      result =>{
        if(result['code']==200){
          this.allNotes=result['data']
        }else{
          console.log(result)
        }
      },
      error =>{
        console.log("error",error)
      }
    )
  }

  getUpdate($event){
    if($event){
      this.allReminderNotes()
      // console.log(this.allNotes)
    }
  }

  reciveTrigger($event){
    this.allReminderNotes()
  }

  ngOnInit() {
    this.allReminderNotes()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
