import { Component, OnInit } from '@angular/core';
import { Squadra } from 'src/app/classi/squadra';
import { ViewIscirzione, TipoSquadra } from 'src/environments/enums';
import { SpinnerService } from 'src/servizi/local/spinner.service';
import { UpgradeSquadraFantaComponent } from './upgrade-squadra-fanta/upgrade-squadra-fanta.component';
import { UpgradeSquadraLocaleComponent } from './upgrade-squadra-locale/upgrade-squadra-locale.component';
import { RegistraSquadraComponent } from './registra-squadra/registra-squadra.component';
import { ListaSquadreComponent } from './lista-squadre/lista-squadre.component';
import { ComponiSquadraComponent } from './componi-squadra/componi-squadra.component';
import { CommonModule } from '@angular/common';
import { MySpinner } from 'src/app/componenti/my-spinner/my-spinner.component';
import { AuthService } from 'src/servizi/client/auth.service';




@Component({
  selector: 'mercato',
  standalone: true,
  imports: [
    UpgradeSquadraFantaComponent,
    UpgradeSquadraLocaleComponent,
    RegistraSquadraComponent,
    ListaSquadreComponent,
    ComponiSquadraComponent,
    CommonModule,
    MySpinner
  ],
  templateUrl: './mercato.component.html'
})
export class MercatoComponent implements OnInit {

  constructor(
    public spinner: SpinnerService,
    private authService: AuthService) {
  }


  ngOnInit() {
    this.fase = this.authService.getLoggato().fase || 0;
  }

  VIEW_ISCRIZIONE = ViewIscirzione;
  fase: number = 0;
  view: number = 0;
  squadra: Squadra = new Squadra();


  changeView(event: any) {

    if (!isNaN(event)) {
      this.view = event
      this.squadra = new Squadra();
    }

  }

  onEdit(squadra: Squadra) {
    this.squadra = squadra
    this.view = ViewIscirzione.CREA
  }

  onRiEdit(squadra: Squadra) {
    this.squadra = squadra
    if (squadra.tipo == TipoSquadra.FANTA)
      this.view = ViewIscirzione.UPGRADE_F

    if (squadra.tipo == TipoSquadra.LOCALE)
      this.view = ViewIscirzione.UPGRADE_L
  }

}
