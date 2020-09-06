import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon-trash',
  templateUrl: './icon-trash.component.html',
  styleUrls: ['./icon-trash.component.scss']
})
export class IconTrashComponent implements OnInit {

  constructor() { }

  @Input() isTrash:boolean = false


  @Output() trash = new EventEmitter<boolean>()

  setTrash(){
    if(this.isTrash){
      this.isTrash=false
    }else{
      this.isTrash=true
    }
    this.trash.emit(this.isTrash)
    // console.log("trash")
  }

  ngOnInit() {
  }

}
