import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Game } from './game/game';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Game],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'mario';
}
