import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon-trash',
  templateUrl: './icon-trash.component.html',
  styleUrls: ['./icon-trash.component.scss']
})
export class IconTrashComponent implements OnInit {

  constructor() { }

  @Output() trash = new EventEmitter<boolean>()

  setTrash(){
    this.trash.emit(true)
  }

  ngOnInit() {
  }

}
