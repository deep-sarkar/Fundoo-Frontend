import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/dataService/data.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';
import { SingleNoteComponent } from '../single-note/single-note.component';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  constructor(
        private _dialogue:MatDialog,
        private _utility:UtilityService,
        private _dataService:DataService
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
    this._dataService.getSingleNote(id)
    .subscribe(
      response =>{
        this.singleNote=response["data"]
        // console.log("get",this.singleNote)
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
    if(this.reminder == null){
      delete this.singleNote["reminder"]
    }
    this._dataService.updateSingleNote(this.id,this.singleNote)
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
    // console.log($event)
    let validation=this._utility.validateReminder($event)
    if (validation){
      this.singleNote['reminder']=$event
      this.reminder = $event
      this.updateNote()
    }else{
      this._utility.snackBarMessage("Enter upcoming time to set reminder.")
    }
  }

  setColor($event){
    // console.log($event)
    if($event){
      this.singleNote['color']=$event
      this.updateNote()
    }
  }

  updateTrigger(){
    this.update.emit(true)
    // console.log("Emmitted")
  }

  archiveNote($event, noteId:number){
      this.id = noteId
      console.log("id",noteId, $event)
        this._dataService.getSingleNote(noteId)
        .subscribe(
          response =>{
            this.singleNote=response["data"]
            this.singleNote["archives"]= $event
            this.updateNote()
          },
          error =>{
            console.log("error",error)
          }
        )
  }

  pinNote($event,noteId){
      this.id = noteId
      console.log("id",noteId, $event)
        this._dataService.getSingleNote(noteId)
        .subscribe(
          response =>{
            this.singleNote=response["data"]
            this.singleNote["pin"]= $event
            this.updateNote()
          },
          error =>{
            console.log("error",error)
          }
        )
  }

  openDialogue(noteId:number){
    this.getNote(noteId)
    this.id=noteId
    // console.log(this.singleNote)
    this.id = noteId
      console.log("id",noteId)
        this._dataService.getSingleNote(noteId)
        .subscribe(
          response =>{
            let ref = this._dialogue.open(SingleNoteComponent,{
              minWidth:'50%',
              height:'auto',
              maxHeight:'90%',
              panelClass: 'dialog-content',
              disableClose: true,
              position:{top:'3%'},
              data:{
                "note":this.singleNote
              }
            });
            ref.afterClosed()
            .subscribe(
              result =>{
                // console.log("result",result)
                this.singleNote=result
                if(this.singleNote['reminder']){
                    let validation=this._utility.validateReminder(this.singleNote['reminder'])
                    if(validation){
                    this.reminder=this.singleNote['reminder']
                }
                }
                this.updateNote()
              }
            )
          },
          error =>{
            console.log("error",error)
          }
        )
   
      
  }


  ngOnInit() {
  }

}
