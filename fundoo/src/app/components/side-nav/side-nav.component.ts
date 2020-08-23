import { tokenName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor() { }

  logout(){
    localStorage.removeItem('token')
    let token=localStorage.getItem('token')
    console.log('token',token)
    console.log("success")
  }

  ngOnInit() {
  }

}
