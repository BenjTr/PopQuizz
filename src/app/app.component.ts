import {Component, OnInit} from '@angular/core';
import {UtilsService} from './utils/utils.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'pop-quizz';

    constructor(private utils: UtilsService, private router: Router) {
    }


    ngOnInit(): void {
        console.log('stored Pseudo : ' + this.utils.getFromLocal('pseudo'));
        if (this.utils.getFromLocal('pseudo') == undefined) {
            this.router.navigate(['/login']);
        }
    }
}
