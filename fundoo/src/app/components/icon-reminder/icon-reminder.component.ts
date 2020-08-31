import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-icon-reminder',
  templateUrl: './icon-reminder.component.html',
  styleUrls: ['./icon-reminder.component.scss']
})
export class IconReminderComponent implements OnInit {


  constructor(private atp:AmazingTimePickerService) { }
  selectedTime:string;
  @Output() reminder = new EventEmitter<string>()

  open() {
    const amazingTimePicker = this.atp.open({
      time:this.selectedTime
    
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime=time
      this.reminder.emit(this.selectedTime)
    })
  }

  ngOnInit() {
  }

}
