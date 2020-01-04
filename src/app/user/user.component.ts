import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {UtilsService} from '../utils/utils.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    pseudo: string;

    constructor(private location: Location, private utils: UtilsService, private router: Router) {
    }

    ngOnInit() {
        if (this.utils.getFromLocal('pseudo') === undefined) {
            this.router.navigate(['/login']);
        }
        this.pseudo = this.utils.getFromLocal('pseudo');
    }

    onBackClick() {
        this.location.back();
    }

}
