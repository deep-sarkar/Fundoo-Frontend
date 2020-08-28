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
  archive:boolean;

  @Output() trigger = new EventEmitter();
  
  newNoteTrigger(){
    this.trigger.emit("New Note Created")
  }

  create(){
    if(this.title.value && this.noteBody.value){
      this.noteData = {
        title:this.title.value,
        note:this.noteBody.value,
        archives:this.archive
      }
      this._httpService.createNotes(this.noteData)
      .subscribe(
        response => {
          if (response['code'] == 201){
            this._snackBar.snackBarMessage("New note created !!!")
            //field value set to empty
            this.title= new FormControl('')
            this.noteBody = new FormControl('')
            //trigger fired(event)
            this.newNoteTrigger()
          }else{
            this._snackBar.snackBarMessage(response['msg'])
          }
        },
        error =>{
            console.log("error",error)
        }
      )
    }else{
      this._snackBar.snackBarMessage("Title and note required !!!")
    }
  }
  
  //card open close handeling function
  cardOpenClose(){
    if(this.cardOpen==false){
      this.cardOpen=true
    }else{
      this.create()
      this.cardOpen=false
    }
  }

  //this function will set archive value to true if user pressed archive icon
  getArchive($event){
    this.archive=$event;
    this.create()
  }
  

  ngOnInit() {
  }

}
