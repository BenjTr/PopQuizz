import { Component } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  // Game Informations
  time:number = 0;
  round:number = 0;
  theme:string = '';
  status:string = '';
  isPicture:boolean = false;

  data:string = '';

  lockInput:boolean = false;
  answer:string = '';
  userAnswer:string = '';

  // Players
  pseudo:string = '';
  players: any = new Map();

  constructor(private socket: Socket, private utils: UtilsService) {
    this.pseudo = this.utils.getFromLocal('pseudo');

    this.socket.emit('new-player', { pseudo: this.utils.getFromLocal('pseudo')});

    this.socket.on('time', res => {
      this.time = res.time;

      if (this.status === 'end' && this.time === 5) {
        this.players = new Map();
      }
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

    this.socket.on('players', res => {
      for (const p of res.players) {
        if (this.players.get(p.pseudo) === undefined) {
          this.players.set(p.pseudo, p);
        } else {
          this.players.get(p.pseudo).score = p.score;
          this.players.get(p.pseudo).found = p.found;
        }
      }
    });

    this.socket.on('fail', () => {
      this.userAnswer = '';
    });

    this.socket.on('found', () => {
      this.lockInput = true;
      this.userAnswer = '';
    });

    this.socket.on('status', res => {
      this.status = res.status;
      switch (this.status) {
        case 'question':
          this.lockInput = false;
          this.userAnswer = '';
          break;
        case 'answer':
          this.lockInput = true;
          this.userAnswer = '';
          break;
        case 'end':
          this.socket.emit('active', { pseudo: this.utils.getFromLocal('pseudo')});
      }
    });
  }

  onKeydown(event) {
    this.socket.emit('user-answer', {
      answer: event.target.value,
      pseudo: this.utils.getFromLocal('pseudo')
    });
  }

  score = (a, b) => {
    if (a.value.score < b.value.score) { return b.key; }
  }
}
