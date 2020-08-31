import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-icon-palette',
  templateUrl: './icon-palette.component.html',
  styleUrls: ['./icon-palette.component.scss']
})
export class IconPaletteComponent implements OnInit {

  constructor() { }

  @Output() color = new EventEmitter()

  ngOnInit() {
  }
  pickColor(clr:string){
    // console.log(clr)
    this.color.emit(clr)
  }
}
