import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  enteredUsername = '';
  enteredPassword = '';

  constructor() { }

  ngOnInit() {
  }

  signUp() {
    alert('not released yet');
  }

  signIn() {
    alert('on the way');
  }
}
