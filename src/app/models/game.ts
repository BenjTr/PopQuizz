import { Player } from './player';
import { GameResponse } from './game-response';

export class Game {
    id: string;
    players: Player[];
    round: number;
    maxRound: number;
    time: number;
    response: GameResponse;
}
