import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  // Game Informations
  time: Number = 0;
  round: Number = 0;
  theme: String = '';
  isPicture: Boolean = false;
  data: String = '';
  answer: String = '';

  // Players 
  pseudo: String = '';
  players: Map<String, JSON> = new Map();

  constructor(private socket: Socket, private utils: UtilsService) {
    this.pseudo = this.utils.getFromLocal('pseudo');


    this.socket.on('new-connection', res => {
      this.socket.emit('new-player', { pseudo: this.utils.getFromLocal('pseudo')});
    });

    this.socket.on('time', res => {
      this.time = res.time;
    });

    this.socket.on('round', res => {
      this.round = res.round;
      this.answer = '';
    });

    this.socket.on('question', res => {
      this.theme = res.theme;
      this.isPicture = res.is_picture;
      this.data = res.data;
    });

    this.socket.on('answer', res => {
      this.answer = res.answer;
    });
  }

  sendMessage(message: string) {
    this.socket.emit('game-connection', { text : message });
  }

  ngOnInit() {
  }

  score = (a, b) => {
    if (a.value.score < b.value.score) { return b.key; }
  }
}
