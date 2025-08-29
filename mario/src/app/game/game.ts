import { Component, HostListener } from '@angular/core';
import { Player } from '../model/player';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game {

  left = 50;
  player = {} as Player;

  onInit() {
    this.generatePlayer();
  }

  generatePlayer() {
    this.player.posOx = 50;
    this.player.posOy = 500;

  }

  @HostListener('document:keyup', ['$event'] )
  KeyUpEvent(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowRight' :
      this.movePlayer(true);
      break;
      case 'ArrowLeft':
        this.movePlayer(false);
      break;
  }
}

movePlayer(toRight = true){
  switch(toRight){
    case true:
      console.log('move right');
      this.player.posOx += 10;
      break;
      default:
        console.log('move left');
       
  }
}

}
