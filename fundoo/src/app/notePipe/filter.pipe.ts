import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
@Injectable()
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchTerm:string): any {
    if(!value || !searchTerm){
      return value
    }
    let notes = []
    return value.filter(search =>{
      console.log(search.title.toLowerCase().indexOf(searchTerm.toLowerCase()))
     return search.title.toLowerCase().
            indexOf(searchTerm.toLowerCase()) > -1 
            || 
            search.note.toLowerCase().
            indexOf(searchTerm.toLowerCase()) > -1
    })
  }

}
