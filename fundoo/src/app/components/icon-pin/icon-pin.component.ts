import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon-pin',
  templateUrl: './icon-pin.component.html',
  styleUrls: ['./icon-pin.component.scss']
})
export class IconPinComponent implements OnInit {

  constructor() { }

  @Input() isPin = false
  @Output() pin = new EventEmitter<boolean> ()

  setPin(){
    if(this.isPin){
      this.isPin=false
    }else{
      this.isPin = true
    }
    this.pin.emit(this.isPin)
    // console.log(this.isPin)
  }

  ngOnInit() {
  }

}
