import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pseudo: String = '';

  constructor(private utils: UtilsService, private router: Router) { }

  ngOnInit() {
    this.pseudo = this.utils.getFromLocal('pseudo');
  }

}
