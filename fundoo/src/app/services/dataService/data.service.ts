import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from '../genericService/generic.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _http:GenericService
  ) { }

  noteUrl = environment.notesUrl

  getNotes(): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
    return this._http.getService(this.noteUrl + "create/", {headers:headers})
  }

  createNotes(noteData:object): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
    return this._http.postService(this.noteUrl + "create/", noteData,{headers:headers})
  }

  getSingleNote(id:number): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
      return this._http.getService(this.noteUrl+"open/"+id+"/",{headers:headers})
  }
  
  updateSingleNote(id:number, noteData:object): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
      return this._http.putService(this.noteUrl+"open/"+id+"/",noteData,{headers:headers})
  }

  createLabel(labelData:object): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
    return this._http.postService(this.noteUrl + "create/label/", labelData,{headers:headers})
  }

  getLabel(): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
    return this._http.getService(this.noteUrl + "create/label/", {headers:headers})
  }

  editLabel(id:number, labelData:object){
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
    return this._http.putService(this.noteUrl + "open/label/"+ id + "/", labelData, {headers:headers})
  }

  deleteLabel(id:number){
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
     let url = this.noteUrl + "open/label/"+ id + "/"
     console.log(url)
    return this._http.deleteService(url,{headers:headers})
  }

  getReminder(): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
    return this._http.getService(this.noteUrl + "reminder/", {headers:headers})
  }

  getArchives(): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
    return this._http.getService(this.noteUrl + "archives/", {headers:headers})
  }

  getTrash(): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
    return this._http.getService(this.noteUrl + "trash/", {headers:headers})
  }

  deleteTrash(id:number): Observable<any>{
    let headers = new HttpHeaders(
      {"Content-Type": "application/json",
      "Authorization": "JWT "+localStorage.getItem('token')})
    return this._http.deleteService(this.noteUrl + "trash/" + id + "/", {headers:headers})
  }
}
