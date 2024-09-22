import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RuoliUtente } from 'src/environments/enums';

@Component({
  selector: 'lista-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-account.component.html',
  styleUrl: './lista-account.component.scss'
})
export class ListaAccountComponent {

  @Input() utenti: any;


  RUOLI_UTENTE = RuoliUtente;


  viewRuolo(input: number) {

    switch (Number(input)) {
      case this.RUOLI_UTENTE.PLAYER:
        return "PLAYER"
      case this.RUOLI_UTENTE.GHOST:
        return "GHOST"
      case this.RUOLI_UTENTE.ADMIN:
        return "ADMIN"

      default: return ""
    }

  }
}
