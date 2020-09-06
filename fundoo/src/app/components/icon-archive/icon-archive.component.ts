import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-icon-archive',
  templateUrl: './icon-archive.component.html',
  styleUrls: ['./icon-archive.component.scss']
})
export class IconArchiveComponent implements OnInit {

  constructor() { }

  @Input() isArchive = false
  @Output() archive = new EventEmitter<boolean>()


  onClick(){
    if(this.isArchive){
      this.isArchive=false
    }else{
      this.isArchive=true
    }
    // console.log(this.isArchive)
    this.archive.emit(this.isArchive)
    // console.log("Archive Emmited")
  }

  ngOnInit() {
  }

}
