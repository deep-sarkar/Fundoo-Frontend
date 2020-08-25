import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
