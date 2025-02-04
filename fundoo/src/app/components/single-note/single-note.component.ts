import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { UtilityService } from 'src/app/services/utilityService/utility.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { Subscription } from 'rxjs';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';


@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _utility:UtilityService,
    private _dataService:DataService,
    private _validation:ValidateFormFieldService,
    private _accountService:AccountHttpService
    ) { }
  
  @Output() updateDone = new EventEmitter<boolean>()
  //to store single note
  singleNote:object={};
  allLabel:string[];
  allUsers:object[];
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
  collaborator:number[];
  image:File;
  urls:string;
  user:string
  noteTitle = new FormControl()
  noteBody = new FormControl()
  getLabelSubscription: Subscription;
  updateNoteSubscription: Subscription;

  updateTrigger(){
    this.updateDone.emit(true)
    // console.log("Emmitted")
  }  

  updateNote(id:number,noteData:object ){
    // console.log(noteData)
    this.updateNoteSubscription = this._dataService.updateSingleNote(id, noteData)
      .subscribe(
        response =>{
          if(response['code']==202){
          this.updateTrigger()
          // this._utility.snackBarMessage("Note updated !!")
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
    this.collaborator =  this.singleNote["collaborators"]
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
    this._utility.snackBarMessage("Title updated !!")
  }
  
  editBody(){
    let note = {note:this.noteBody.value}
    this.updateNote(this.id,note)
    this._utility.snackBarMessage("Note updated !!")
  }

  setReminder($event){
    // console.log($event)
    let validation=this._validation.validateReminder($event)
    if (validation){
      this.reminder=$event
      let note = {reminder:$event}
      this._utility.snackBarMessage("Added reminder for " + $event)
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
      this._utility.snackBarMessage("Color updated !!")
    }
  }

  archiveNote($event){
    // console.log($event)
    if($event){
        this.archives= $event 
        let note = {archives:$event}
      this.updateNote(this.id,note)   
      this._utility.snackBarMessage("Note archived !!")
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
    if($event){
      this._utility.snackBarMessage("Note trashed !!")
    }else{
      this._utility.snackBarMessage("Note untrashed !!")
    }
    
  }

  getAllLabels(){
    this.getLabelSubscription = this._dataService.getLabel()
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
      this._utility.snackBarMessage("label \'"+singleLabel+"\' added !!")
    }else{
      this.removeLabel(singleLabel)
      this._utility.snackBarMessage("label \'"+singleLabel+"\' removed !!")
    }
  }

  removeLabel(singleLabel:string){
    for(var i=0; i<this.label.length;i++){
      if(this.label[i]===singleLabel){
        this.label.splice(i,1)
        this._utility.snackBarMessage("label \'"+singleLabel+"\' removed !!")
      }
    }
    let note = {label:this.label}
    this.updateNote(this.id,note)
  }

  isNoteLabel(singleLable:string){
    return this.label.includes(singleLable)
  }

  getAllUser(){
    this._accountService.getAllUser()
    .subscribe(
      response =>{
        if(response["code"]===200){
          this.allUsers = response["data"]
        }
        // console.log(this.allUsers)
      }
    )
  }

  isNoteCollaborator(id:number){
    return this.collaborator.includes(id)
  }

  updateCollaborator($event, id:number){
    if($event.checked){
      this.collaborator.push(id)
      let note = {collaborators:this.collaborator}
      this.updateNote(this.id,note)
      this._utility.snackBarMessage("collaborator added !!")
    }else{
      this.removeCollaborator(id)
    }
    // console.log("collaborator",this.collaborator)
  }

  removeCollaborator(id:number){
    for(var i=0; i<this.collaborator.length;i++){
      if(this.collaborator[i]===id){
        this.collaborator.splice(i,1)
      }
    }
    this._utility.snackBarMessage("Collaborator removed !")
    let note = {collaborators:this.collaborator}
    this.updateNote(this.id,note)
    // console.log("collaborator",this.collaborator)
  }

  ngOnDestroy(){
    if(this.getLabelSubscription){
      this.getLabelSubscription.unsubscribe()
    }
    if(this.updateNoteSubscription){
      // console.log("ok")
      this.updateNoteSubscription.unsubscribe()
      
    }
  }
}
