import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-archive',
  templateUrl: './icon-archive.component.html',
  styleUrls: ['./icon-archive.component.scss']
})
export class IconArchiveComponent implements OnInit {

  constructor() { }

  @Output() archive = new EventEmitter<boolean>()

  onClick(){
    this.archive.emit(true)
    console.log("Archive Emmited")
  }

  ngOnInit() {
  }

}
