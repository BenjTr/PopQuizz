import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  time: Number = 0;
  round: Number = 0;
  theme: String = '';
  isPicture: Boolean = false;
  data: String = '';
  answer: String = '';

  constructor(private socket: Socket) {
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
}
