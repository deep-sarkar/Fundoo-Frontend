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
 
  getPin(pin:boolean){
    this.isPin=pin
    return true
  }


  updateNote(id:number,noteData:object ){
    console.log(noteData)
    if(this.reminder == null){
      delete noteData["reminder"]
    }
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

  setReminder($event, noteId){
    console.log($event)
    let validation=this._utility.validateReminder($event)
    if (validation){
      this.reminder = $event
      let note ={reminder:$event}
      this.updateNote(noteId, note)
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
    }
  }

  updateTrigger(){
    this.update.emit(true)
    // console.log("Emmitted")
  }

  archiveNote($event, noteId:number){
    let note ={archives:$event}
    this.updateNote(noteId, note)
  }

  pinNote($event,noteId){
    let note = {pin:$event}
    this.updateNote(noteId, note)
  }

  trashNote($event,noteId){
    // console.log($event,noteId)
    let note = {trash:$event}
    this.updateNote(noteId, note)
  }

  openDialogue(noteId:number){
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
              "note":response['data']
            }
          });
          ref.afterClosed()
          .subscribe(
            result =>{
              // console.log("result",result)
              let note = result
              if(note['reminder']){
                  let validation=this._utility.validateReminder(note['reminder'])
                  if(validation){
                  this.reminder=note['reminder']
              }
              }
              this.updateNote(noteId, note)
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
