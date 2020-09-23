import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';
import { ValidateFormFieldService } from 'src/app/services/validationService/validate-form-field.service';
import { SingleNoteComponent } from '../single-note/single-note.component';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit, OnDestroy {

  constructor(
        private _dialogue:MatDialog,
        private _utility:UtilityService,
        private _dataService:DataService,
        private _validation: ValidateFormFieldService,
        private _accountService:AccountHttpService
     ) { 
      _utility.viewClass.next(this.viewClass)
     }

  @Input() allNotes:object[];
  @Output() update = new EventEmitter<boolean>()
  reminder:string=null;
  subscription: Subscription;
  viewClassSubscription:Subscription;
  viewClass:string = "main-container-grid";
  collaborator:number[]=[];
  allUsers:object[];
  id:number;
  searchTerm:string='';

  searchNote(){
    this._utility.searchItem
    .subscribe(
      response =>{
        this.searchTerm = response
        // console.log("display",response)
      }
    )
  }

  changeCollaborators(id:number,noteCollaborators:number[]){
    // console.log("colab",collaborators)
    this.collaborator=noteCollaborators
    this.id = id
    // console.log(id,this.collaborator)
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

  isNoteCollaborator(colId:number){
    return this.collaborator.includes(colId)
  }

  updateCollaborator($event, colId:number){
    if($event.checked){
      this.collaborator.push(colId)
      let note = {collaborators:this.collaborator}
      this.updateNote(this.id,note)
      this._utility.snackBarMessage("collaborator added !!")
    }else{
      this.removeCollaborator(colId)
    }
    // console.log("collaborator",this.collaborator)
  }

  removeCollaborator(colId:number){
    for(var i=0; i<this.collaborator.length;i++){
      if(this.collaborator[i]===colId){
        this.collaborator.splice(i,1)
      }
    }
    this._utility.snackBarMessage("Collaborator removed !")
    let note = {collaborators:this.collaborator}
    this.updateNote(this.id,note)
    // console.log("collaborator",this.collaborator)
  }



  changeTemplateClass(){
    this.viewClassSubscription =  this._utility.viewClass
    .subscribe(
      result =>{
        // console.log(result)
        this.viewClass = result
      }
    )
  }

  updateNote(id:number,noteData:object ){
    // console.log(noteData)
    if(this.reminder == null){
      delete noteData["reminder"]
    }
    this.subscription = this._dataService.updateSingleNote(id, noteData)
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

  setReminder($event, noteId){
    console.log($event)
    let validation=this._validation.validateReminder($event)
    if (validation){
      this.reminder = $event
      let note ={reminder:$event}
      this.updateNote(noteId, note)
      this._utility.snackBarMessage("Reminder set for "+ $event)
      // console.log("ok")
    }else{
      this._utility.snackBarMessage("Enter upcoming time to set reminder.")
    }
  }

  setColor($event,noteId){
    // console.log($event)
    if($event){
      let note = {color:$event}
      this.updateNote(noteId, note)
      this._utility.snackBarMessage("Color updated !!")
    }
  }

  updateTrigger(){
    this.update.emit(true)
    // console.log("Emmitted")
  }

  archiveNote($event, noteId:number){
    let note ={archives:$event}
    this.updateNote(noteId, note)
    this._utility.snackBarMessage("Note archived !!")
  }

  pinNote($event,noteId){
    let note = {pin:$event}
    this.updateNote(noteId, note)
  }

  trashNote($event,noteId){
    // console.log($event,noteId)
    let note = {trash:$event}
    this.updateNote(noteId, note)
    if($event){
      this._utility.snackBarMessage("Note trashed !!")
    }else{
      this._utility.snackBarMessage("Note untrashed !!")
    }
    
  }

  deletForever(id:number){
    this._dataService.deleteTrash(id)
    .subscribe(
      response =>{
        this.updateTrigger()
        this._utility.snackBarMessage("Note deleted !!!")
      },
      error=>{
        console.log("error",error)
      }
    )
  }

  openDialogue(noteId:number){
    // console.log("id",noteId)
      this._dataService.getSingleNote(noteId)
      .subscribe(
        response =>{
          let note = response['data']
          note["id"]=noteId
          let ref = this._dialogue.open(SingleNoteComponent,{
            minWidth:'60%',
            maxWidth:'100%',
            height:'auto',
            maxHeight:'90%',
            panelClass: 'dialog-content',
            // disableClose: true,
            position:{top:'3%'},
            data:{
              "note":note
            }
          });
          ref.componentInstance.updateDone
          .subscribe(
            result =>{
              // console.log("result",result)
              this.updateTrigger()
            }
          )
        },
        error =>{
          console.log("error",error)
        }
      )
  }


  ngOnInit() {
    if(this._accountService.isLoggedIn())
    {
      this.changeTemplateClass()
      this.getAllUser()
      this.searchNote()
      this._accountService.isTokenExpired()
    }
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
    if(this.viewClassSubscription){
      this._utility.viewClass.next(this.viewClass)
      this.viewClassSubscription.unsubscribe()
    }
  }
  
}
