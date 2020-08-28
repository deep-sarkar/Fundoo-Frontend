import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

@Component({
  selector: 'app-icon-palette',
  templateUrl: './icon-palette.component.html',
  styleUrls: ['./icon-palette.component.scss']
})
export class IconPaletteComponent implements OnInit {

  constructor(private _dialogue:MatDialog) { }

  @Output() color = new EventEmitter()

  ngOnInit() {
  }
  openDialogue($event){
    let dialogRef = this._dialogue.open(ColorPickerComponent,{
      width:'9em',
      height:'7.5em',
    });
    dialogRef.afterClosed()
    .subscribe(result=>{
      console.log("result",result)
      this.color.emit(result)
    })
  }
}
