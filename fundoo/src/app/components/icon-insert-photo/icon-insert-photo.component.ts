import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon-insert-photo',
  templateUrl: './icon-insert-photo.component.html',
  styleUrls: ['./icon-insert-photo.component.scss']
})
export class IconInsertPhotoComponent implements OnInit {

  constructor() { }

  @Output() sendImage = new EventEmitter()
  imageFile: File=null;
  formData:object;
  imageUrl;


  uploadImage($event){
    this.imageFile = <File>$event.target.files[0]
   
    console.log("url",this.imageUrl)
    this.sendImage.emit(this.imageFile)
  }

  ngOnInit() {
  }
}
