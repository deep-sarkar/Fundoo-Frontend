import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utilityService/utility.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  userInput:string;

  constructor(
    private _utility:UtilityService
  ) { }

  getInput(){
    // console.log("input",this.userInput)
    this._utility.searchItem.next(this.userInput)
  }

  ngOnInit() {

  }

}
