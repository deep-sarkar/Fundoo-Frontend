import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  constructor( ) { }

  @Input() allNotes:object[];

  ngOnInit() {
  }

}
