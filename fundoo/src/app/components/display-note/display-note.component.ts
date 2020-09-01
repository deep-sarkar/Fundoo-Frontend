import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';
import { NotesComponent } from '../notes/notes.component';
import { SingleNoteComponent } from '../single-note/single-note.component';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  constructor(
        private _dialogue:MatDialog,
        private _accountService:AccountHttpService,
        private _utility:UtilityService
     ) { }

  @Input() allNotes:object[];
  @Output() update = new EventEmitter<boolean>()
  isPin:boolean=false;
  reminder:string=null;
  id:number;
  singleNote:object;


  getPin(pin:boolean){
    this.isPin=pin
    return true
  }

  getNote(id:number){
    this._accountService.getSingleNote(id)
    .subscribe(
      response =>{
        this.singleNote=response["data"]
        console.log("get",this.singleNote)
      },
      error =>{
        console.log("error",error)
      }
    )
  }

  getId(noteId:number){
    // console.log(noteId)
    this.id=noteId
    this.getNote(this.id)
  }

  updateNote(){
    // console.log(this.singleNote)
    if(this.singleNote['reminder'] == null){
      delete this.singleNote["reminder"]
    }
    this._accountService.updateSingleNote(this.id,this.singleNote)
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

  setReminder($event){
    console.log($event)
    let validation=this._utility.validateReminder($event)
    if (validation){
      this.singleNote['reminder']=$event
      this.updateNote()
    }else{
      this._utility.snackBarMessage("Enter upcoming time to set reminder.")
    }
  }

  setColor($event){
    console.log($event)
    if($event){
      this.singleNote['color']=$event
      this.updateNote()
    }
  }

  updateTrigger(){
    this.update.emit(true)
    // console.log("Emmitted")
  }

  openDialogue(id:number){
    console.log(id)
    this._dialogue.open(SingleNoteComponent,{
      width:'50%',
      height:"80%",
      panelClass: 'dialog-content'
    })
  }

  archiveNote($event){
    if($event){
      setTimeout(() => {
        this.singleNote["archives"]= $event
        this.updateNote()
      }, 1000);
      
    }
  }

  pinNote($event){
    setTimeout(() => {
      this.singleNote["pin"]= $event
      this.updateNote()
    }, 1000);
  }

  ngOnInit() {
  }

}
