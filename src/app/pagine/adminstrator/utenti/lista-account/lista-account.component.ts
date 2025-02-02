import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LOOKUPS } from 'src/app/classi/dto/lookup.dto';


@Component({
  selector: 'lista-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-account.component.html',
  styleUrl: './lista-account.component.scss'
})
export class ListaAccountComponent {

  @Input() utenti: any[]=[];


  RUOLI_UTENTE = LOOKUPS.RUOLI;


  viewRuolo(input: number) {

    switch (Number(input)) {
      case LOOKUPS.RUOLI.PLAYER:
        return "PLAYER"
      case LOOKUPS.RUOLI.GHOST:
        return "GHOST"
      case LOOKUPS.RUOLI.ADMIN:
        return "ADMIN"

      default: return ""
    }

  }
}
