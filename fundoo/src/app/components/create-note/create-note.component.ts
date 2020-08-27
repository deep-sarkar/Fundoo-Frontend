import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  constructor(
    private _httpService:AccountHttpService,
    private _snackBar:UtilityService
  ) { }

  cardOpen:boolean=false;
  noteData:object;
  title = new FormControl('');
  noteBody = new FormControl('');

  @Output() trigger = new EventEmitter();
  
  newNoteTrigger(){
    this.trigger.emit("New Note Created")
    console.log("emitted")
  }

  create(){
    if(this.title.value && this.noteBody.value){
      this.noteData = {
        title:this.title.value,
        note:this.noteBody.value
      }
      this._httpService.createNotes(this.noteData)
      .subscribe(
        response => {
          if (response['code'] == 201){
            this._snackBar.snackBarMessage("New note created !!!")
            this.title= new FormControl('')
            this.noteBody = new FormControl('')
            this.newNoteTrigger()
          }else{
            this._snackBar.snackBarMessage(response['msg'])
          }
        },
        error =>{
            console.log("error",error)
        }
      )
    }
  }
  

  cardOpenClose(){
    if(this.cardOpen==false){
      this.cardOpen=true
    }else{
      this.create()
      this.cardOpen=false
    }
  }

  

  ngOnInit() {
  }

}
