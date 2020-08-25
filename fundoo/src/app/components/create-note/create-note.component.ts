import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  constructor() { }

  cardOpen:boolean=false;

  cardOpenClose(){
    if(this.cardOpen==false){
      this.cardOpen=true
    }else{
      this.cardOpen=false
    }
  }


  ngOnInit() {
  }

}
