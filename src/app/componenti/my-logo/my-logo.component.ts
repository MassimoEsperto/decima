import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from 'src/app/classi/utente';
import { PlayerService } from 'src/app/servizi/player.service';

@Component({
  selector: 'my-logo',
  templateUrl: './my-logo.component.html',
  styleUrls: ['./my-logo.component.scss']
})
export class MyLogo implements OnInit {

  @Input() is_upgrade: any;

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

  loggato: Utente = new Utente();

  ngOnInit() { this.loggato = this.playerService.getLoggato(); }

  visualizzaProfilo() {
    this.router.navigate(['/dashboard/info-utente']);
  }

  upgradeTeam() {
    this.router.navigate(['/dashboard/aggiorna-rosa']);
  }

}

