import { Component, OnInit } from '@angular/core';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  constructor(private _httpService:AccountHttpService) { }

  allNotes:object[];

  getAllNotes(){
    this._httpService.getNotes().subscribe(
      response =>{
        if (response['code']==200){
          this.allNotes = response['data']
          console.log(this.allNotes)
        }
      },
      error =>{
        console.log('error',error)
      }
    )
  }


  ngOnInit() {
    this.getAllNotes()
  }

}
