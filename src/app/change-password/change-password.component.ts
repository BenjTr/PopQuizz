import {Component, Injectable, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {sha512} from "js-sha512";

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    private CHANGE_PASSWORD_URL = '/api/users/password';

    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    errorMessage: string;

    constructor(private location: Location, private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
    }

    onBackClick() {
        this.location.back();
    }

    onSubmit() {
        this.errorMessage = '';

        if (this.newPassword !== this.confirmPassword) {
            this.errorMessage = 'New Password and confirmation do not match.';
        } else {

            const requestBody = {
                oldPassword: sha512(this.oldPassword),
                newPassword: sha512(this.newPassword)
            };

            // To send session cookie
            const requestOptions = {
                withCredentials: true
            };

            this.http.put(this.CHANGE_PASSWORD_URL, requestBody, requestOptions)
                .subscribe(
                    val => {
                        this.errorMessage = 'Your password has been changed !';
                        this.router.navigate(['/user']);
                    },
                    error => {
                        this.errorHandler(error);
                    });

        }
    }

    errorHandler = (error) => {
        // tslint:disable-next-line:triple-equals
        if (error.status == '409') {
            this.errorMessage = 'Old Password does not match with your current one';
        }
        // tslint:disable-next-line:triple-equals
        if (error.status == '500') {
            this.errorMessage = 'Database Error';
        }
        // tslint:disable-next-line:triple-equals
        if (error.status == '401') {
            this.router.navigate(['/login']);
        }
    }
}
