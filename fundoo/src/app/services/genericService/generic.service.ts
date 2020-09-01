import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private _httpClint:HttpClient) { }

  getService(url:string, header:object){
    return this._httpClint.get(url, header)
  }

  postService(url:string, data:any, header:object){
    return this._httpClint.post(url, data, header)
  }

  putService(url:string, data:any, header:object){
    return this._httpClint.put(url,data,header)
  }
}
