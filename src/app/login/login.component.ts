import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from '../utils/utils.service';
import {Router} from '@angular/router';
import {sha512} from "js-sha512";

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private LOGIN_URL = '/api/users/login';


    errorMessage: string;
    enteredUsername = '';
    enteredPassword = '';


    constructor(private http: HttpClient, private utils: UtilsService, private router: Router) {
    }

    ngOnInit() {
    }

    signUp() {
        this.router.navigate(['/register']);
    }

    signIn() {
        if (this.enteredPassword == '' || this.enteredUsername == '') {
            this.errorMessage = 'Complete the fields.';
            return;
        }
        this.http.post(this.LOGIN_URL, {
            login: this.enteredUsername,
            password: sha512(this.enteredPassword)
        })
            .subscribe(
                (val) => {
                    this.utils.saveInLocal('pseudo', JSON.parse(JSON.stringify(val)).pseudo);
                    this.router.navigate(['home']);
                },
                error => {
                    this.errorHandler(error);
                });

    }

    errorHandler = (error) => {
        // tslint:disable-next-line:triple-equals
        if (error.status == '400') {
            this.errorMessage = 'Error during sending of parameters.';
        }
        // tslint:disable-next-line:triple-equals
        if (error.status == '500') {
            this.errorMessage = 'Database Error.';
        }
        // tslint:disable-next-line:triple-equals
        if (error.status == '401') {
            this.errorMessage = 'Login or Password incorrect.';
        }
    }

}
