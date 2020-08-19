import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor() { }
  name = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  confirm = new FormControl('');


  ngOnInit() {
  }

}
