import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/dataService/data.service';
import { UtilityService } from 'src/app/services/utilityService/utility.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit, OnDestroy {

  @Output() trigger = new EventEmitter();

  constructor(
    private _utility:UtilityService,
    private _dataService:DataService
  ) { }

  
  subscription: Subscription;
  cardOpen:boolean=false;
  noteData:object;
  title = new FormControl('');
  noteBody = new FormControl('');
  archive:boolean=false;
  imageData:File=null;
  imgUrl:string;
  formData = new FormData()
  color:string='#ffffff';
  label:string[]=[];
  pin:boolean = false;
  reminder:string = null;
  allLabel:object[];

  create(){
    if(this.title.value && this.noteBody.value){
      this.noteData = {
        title:this.title.value,
        note:this.noteBody.value,
        archives:this.archive,
        color:this.color,
        pin:this.pin,
        label:this.label
      }
      if (this.reminder != null){
        if(this._utility.validateReminder(this.reminder)){
          this.noteData['reminder'] = this.reminder
        }else{
          this._utility.snackBarMessage("Enter upcoming time for reminder !!!");
          this.reminder = null;
          return
        }
      }
      // console.log('create fn',this.noteData)
      this.subscription = this._dataService.createNotes(this.noteData)
      .subscribe(
        response => {
          if (response['code'] == 201){
            if(this.archive){
              this._utility.snackBarMessage("New note added to archive !!!")
            }else{
              this._utility.snackBarMessage("New note created !!!");
            }
            //field value set to empty
            this.title= new FormControl('');
            this.noteBody = new FormControl('');
            this.archive = false;
            this.color = '#ffffff';
            this.imgUrl= null;
            this.pin = false;
            this.reminder= null;
            this.label=[]
            //trigger fired(event)
            this.newNoteTrigger()
          }else{
            this._utility.snackBarMessage(response['msg'])
          }
        },
        error =>{
            console.log("error",error)
        }
      )
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
    // console.log("occoured")
    this.imageData = $event
    var reader = new FileReader();
    reader.readAsDataURL(this.imageData)
    reader.onload=(res:any)=>{
      this.imgUrl = res.target.result
    }
    // console.log($event)
  }



  //set background color
  setColor($event){
    // console.log("catched", $event)
    this.color = $event
  }


  setPin($event){
    // console.log("ok",$event)
    this.pin = $event
  }

  setReminder($event){
    console.log('reminder',$event)
    this.reminder=$event
    // console.log(this.reminder)
  }
 
  getAllLabels(){
    this._dataService.getLabel()
    .subscribe(
      response =>{
        // console.log(response['data'])
        this.allLabel = response['data']
      },
      error =>{
        console.log("error",error)
      }
    )
  }

  updateLabel($event,singleLabel:string){
    // console.log($event.checked,singleLabel)
    if($event.checked){
      this.label.push(singleLabel)
    }else{
      this.removeLabel(singleLabel)
    }
  }

  removeLabel(singleLabel:string){
    for(var i=0; i<this.label.length;i++){
      if(this.label[i]===singleLabel){
        this.label.splice(i,1)
      }
    }
  }

  isNoteLabel(singleLable:string){
    return this.label.includes(singleLable)
  }


  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
}
