import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any ,
    private _dialogRef:MatDialogRef<SingleNoteComponent>
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
  ngOnInit() {
    this.singleNote = this.data.note
    // console.log(this.singleNote)
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

}
