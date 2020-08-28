import { JsonPipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccountHttpService } from 'src/app/services/accountServices/account-http.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  @Output() trigger = new EventEmitter();

  constructor(
    private _httpService:AccountHttpService,
    private _snackBar:UtilityService
  ) { }

  

  cardOpen:boolean=false;
  noteData:object;
  title = new FormControl('');
  noteBody = new FormControl('');
  archive:boolean=false;
  imageData:File=null;
  imgUrl:string;
  formData = new FormData()


  create(){
    if(this.title.value && this.noteBody.value){
      this.noteData = {
        title:this.title.value,
        note:this.noteBody.value,
      }
      this._httpService.createNotes(this.noteData)
      .subscribe(
        response => {
          if (response['code'] == 201){
            if(this.archive){
              this._snackBar.snackBarMessage("New note added to archive !!!")
            }else{
              this._snackBar.snackBarMessage("New note created !!!")
            }
            //field value set to empty
            this.title= new FormControl('')
            this.noteBody = new FormControl('')
            //trigger fired(event)
            this.newNoteTrigger()
          }else{
            this._snackBar.snackBarMessage(response['msg'])
          }
        },
        error =>{
            console.log("error",error)
        }
      )
    }else{
      this._snackBar.snackBarMessage("Title and note required !!!")
    }
  }
  
  //emmithed when new note saved
  newNoteTrigger(){
    this.trigger.emit("New Note Created")
  }
  //card open close handeling function
  cardOpenClose(){
    if(this.cardOpen==false){
      this.cardOpen=true
    }else{
      this.create()
      this.cardOpen=false
    }
  }

  //this function will set archive value to true if user pressed archive icon
  setArchive($event){
    this.archive=$event;
    this.create()
  }
  //set image and display in note
  setImage($event){
    console.log("occoured")
    this.imageData = $event
    var reader = new FileReader();
    reader.readAsDataURL(this.imageData)
    reader.onload=(res:any)=>{
      this.imgUrl = res.target.result
    }
    console.log($event)
  }

  ngOnInit() {
  }

}
