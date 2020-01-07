import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "../utils/utils.service";
import {Router} from "@angular/router";
import {sha512} from "js-sha512";
import {Location} from '@angular/common';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    private SIGNIN_URL = '/api/users/signIn';


    errorMessage: string;
    enteredUsername = '';
    enteredPassword = '';
    enteredConfirmationPassword = '';

    constructor(private http: HttpClient, private utils: UtilsService, private router: Router, private location: Location) {
    }

    ngOnInit() {
    }

    signUp() {
        if (this.enteredPassword == '' || this.enteredUsername == '' || this.enteredConfirmationPassword == '') {
            this.errorMessage = 'Complete the fields.';
            return;
        }
        if (this.enteredPassword !== this.enteredConfirmationPassword) {
          this.errorMessage = 'Passwords do not match !';
          return;
        }
        this.http.post(this.SIGNIN_URL, {
            login: this.enteredUsername,
            password: sha512(this.enteredPassword)
        })
            .subscribe(
                (val) => {
                    this.utils.saveInLocal('pseudo', JSON.parse(JSON.stringify(val)).pseudo);
                    this.router.navigate(['/home']);
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
        if (error.status == '409') {
            this.errorMessage = 'Username already exists !';
        }
    }

    onBackClick() {
        this.location.back();
    }

}
