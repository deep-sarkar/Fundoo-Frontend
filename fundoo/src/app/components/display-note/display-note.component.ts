import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SingleNoteComponent } from '../single-note/single-note.component';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  constructor(private _dialogue:MatDialog ) { }

  @Input() allNotes:object[];
  isPin:boolean;
  checkPin:any;

  getPin(pin:boolean){
    this.isPin=pin
    return true
  }


  openDialogue(id:number){
    console.log(id)
    this._dialogue.open(SingleNoteComponent,{
      width:'50%',
      height:"80%",
      panelClass: 'dialog-content'
    })
  }

  ngOnInit() {
  }

}
