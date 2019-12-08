import { Component, OnInit, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  enteredUsername = '';
  enteredPassword = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  signUp() {
    alert('not released yet');
  }

  signIn() {
    const user: User = {
      userName: this.enteredUsername,
      password: this.enteredPassword
    };
    this.http.post('/api/users/login', {
      login: user.userName,
      password: user.password
    })
    .subscribe(
        (val) => {
            console.log('POST call successful value returned in body', 
                        val);
        },
        response => {
            console.log('POST call in error', response);
        },
        () => {
            console.log('The POST observable is now completed.');
        });

  }

}
