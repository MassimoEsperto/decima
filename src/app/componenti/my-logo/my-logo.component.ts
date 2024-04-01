import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from 'src/app/classi/utente';
import { PlayerService } from 'src/servizi/client/player.service';


@Component({
  selector: 'my-logo',
  templateUrl: './my-logo.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrl: './my-logo.component.scss'
})
export class MyLogo implements OnInit {

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

  loggato: Utente = new Utente();

  ngOnInit() { this.loggato = this.playerService.getLoggato(); }

  visualizzaProfilo() {
    this.router.navigate(['/dashboard/info-utente']);
  }

}

