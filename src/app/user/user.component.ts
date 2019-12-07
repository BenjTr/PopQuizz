import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    pseudo: string;

    constructor(private location: Location) {
    }

    ngOnInit() {
        this.pseudo = 'coucou';
    }

    onBackClick() {
        this.location.back();
    }

}
