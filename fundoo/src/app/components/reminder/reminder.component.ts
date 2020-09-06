import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  constructor(
    private _dataService:DataService
    ) { }

  allNotes:object;
  
  allReminderNotes(){
    this._dataService.getReminder()
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

}
