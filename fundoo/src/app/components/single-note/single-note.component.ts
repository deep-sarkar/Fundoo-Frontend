import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { UtilityService } from 'src/app/services/utilityService/utility.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any ,
    private _dialogRef:MatDialogRef<SingleNoteComponent>,
    private _utility:UtilityService
    ) { }
  
  //to store single note
  singleNote:object={};
    //on init save all property of note here
    title:string;
    note:string;
    color:string;
    reminder:string;
    pin:boolean;
    archives:boolean;
    trash:boolean;
    label:string[];
    collaborator:any[];
    image:File;
    urls:string;
    user:string

  noteTitle = new FormControl()
  noteBody = new FormControl()

  editDone(){
    let updatedNote:object = {
    title:this.noteTitle.value,
    note:this.noteBody.value,
    color:this.color,
    reminder:this.reminder,
    pin:this.pin,
    archives:this.archives,
    trash:this.trash,
    label:this.label,
    collaborator:this.collaborator,
    image:this.image,
    urls:this.urls,
    user:this.user
    }
    this._dialogRef.close(updatedNote)
  }

  mapAttributes(){
    this.title = this.singleNote["title"]
    this.note =  this.singleNote["note"]
    this.color =  this.singleNote["color"]
    this.trash =  this.singleNote["trash"]
    this.pin =  this.singleNote["pin"]
    this.archives =  this.singleNote["archives"]
    this.label =  this.singleNote["label"]
    this.collaborator =  this.singleNote["collaborator"]
    this.image =  this.singleNote["image"]
    this.urls =  this.singleNote["urls"]
    this.user =  this.singleNote["user"]
    // console.log(this.note)
    this.noteTitle = new FormControl(this.title)
    this.noteBody = new FormControl(this.note)
  }

  ngOnInit() {
    this.singleNote = this.data.note
    // console.log(this.singleNote)
    this.mapAttributes()
  }

  setReminder($event){
    // console.log($event)
    let validation=this._utility.validateReminder($event)
    if (validation){
      this.reminder=$event
    }else{
      this._utility.snackBarMessage("Enter upcoming time to set reminder.")
    }
  }

  setColor($event){
    // console.log($event)
    if($event){
      this.color=$event
    }
  }

  archiveNote($event){
    // console.log($event)
    if($event){
        this.archives= $event
        this.editDone()      
    }
  }

  pinNote($event){
    this.pin=$event
    // console.log("pin",$event)
  }

  trashNote($event){
    // console.log("trash",$event)
    this.trash = $event
    this.editDone()   
  }

}
