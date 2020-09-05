import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { UtilityService } from 'src/app/services/utilityService/utility.service';
import { DataService } from 'src/app/services/dataService/data.service';


@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any ,
    private _dialogRef:MatDialogRef<SingleNoteComponent>,
    private _utility:UtilityService,
    private _dataService:DataService
    ) { }
  
  @Output() updateDone = new EventEmitter<boolean>()
  //to store single note
  singleNote:object={};
  allLabel:string[];
  //on init save all property of note here
  id:number;
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


  updateTrigger(){
    this.updateDone.emit(true)
    // console.log("Emmitted")
  }  

  updateNote(id:number,noteData:object ){
    // console.log(noteData)
    this._dataService.updateSingleNote(id, noteData)
      .subscribe(
        response =>{
          if(response['code']==202){
          this.updateTrigger()
          this._utility.snackBarMessage("Note updated !!")
          }else{
            this._utility.snackBarMessage(response['msg'])
          }
        },
        error =>{
            console.log("error",error)
        }
      )
  }

  mapAttributes(){
    this.id = this.singleNote["id"]
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
    this.reminder = this.singleNote["reminder"]
    // console.log(this.note)
    this.noteTitle = new FormControl(this.title)
    this.noteBody = new FormControl(this.note)
  }

  ngOnInit() {
    this.singleNote = this.data.note
    // console.log(this.singleNote)
    this.mapAttributes()
  }

  editTitle(){
    let note = {title:this.noteTitle.value}
    this.updateNote(this.id,note)
  }
  
  editBody(){
    let note = {note:this.noteBody.value}
    this.updateNote(this.id,note)
  }

  setReminder($event){
    // console.log($event)
    let validation=this._utility.validateReminder($event)
    if (validation){
      this.reminder=$event
      let note = {reminder:$event}
      this.updateNote(this.id,note)
    }else{
      this._utility.snackBarMessage("Enter upcoming time to set reminder.")
    }
  }

  setColor($event){
    // console.log($event)
    if($event){
      this.color=$event
      let note = {color:$event}
      this.updateNote(this.id,note)
    }
  }

  archiveNote($event){
    // console.log($event)
    if($event){
        this.archives= $event 
        let note = {archives:$event}
      this.updateNote(this.id,note)   
    }
  }

  pinNote($event){
    this.pin=$event
    let note = {pin:$event}
    this.updateNote(this.id,note)
    // console.log("pin",$event)
  }

  trashNote($event){
    // console.log("trash",$event)
    this.trash = $event
    let note = {trash:$event}
    this.updateNote(this.id,note)
  }

  getAllLabels(){
    this._dataService.getLabel()
    .subscribe(
      response =>{
        // console.log(response['data'])
        this.allLabel = response['data']
      },
      error =>{
        console.log("error",error)
      }
    )
  }


  updateLabel($event,singleLabel:string){
    // console.log($event.checked,singleLabel)
    if($event.checked){
      this.label.push(singleLabel)
      let note = {label:this.label}
      this.updateNote(this.id,note)
    }else{
      this.removeLabel(singleLabel)
    }
  }

  removeLabel(singleLabel:string){
    for(var i=0; i<this.label.length;i++){
      if(this.label[i]===singleLabel){
        this.label.splice(i,1)
      }
    }
    let note = {label:this.label}
    this.updateNote(this.id,note)
  }

  isNoteLabel(singleLable:string){
    return this.label.includes(singleLable)
  }

}
