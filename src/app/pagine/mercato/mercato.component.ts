import { Component, OnInit } from '@angular/core';
import { Squadra } from 'src/app/classi/squadra';
import { ViewIscirzione } from 'src/environments/enums';
import { SpinnerService } from 'src/servizi/local/spinner.service';
import { UpgradeSquadraFantaComponent } from './upgrade-squadra-fanta/upgrade-squadra-fanta.component';
import { UpgradeSquadraLocaleComponent } from './upgrade-squadra-locale/upgrade-squadra-locale.component';
import { RegistraSquadraComponent } from './registra-squadra/registra-squadra.component';
import { ListaSquadreComponent } from './lista-squadre/lista-squadre.component';
import { ComponiSquadraComponent } from './componi-squadra/componi-squadra.component';
import { CommonModule } from '@angular/common';
import { MySpinner } from 'src/app/componenti/my-spinner/my-spinner.component';
import { AuthService } from 'src/servizi/client/auth.service';
import { LOOKUPS } from 'src/app/classi/dto/lookup.dto';




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
    this.fase = this.authService.getInfoCompetizione().fase || 0;
  }

  VIEW_ISCRIZIONE = ViewIscirzione;
  fase: number = 0;
  view: number = 1;
  squadra: Squadra = new Squadra();


  changeView(event: any) {

    if (!isNaN(event)) {
      this.view = event
      this.squadra = new Squadra();
      console.log("changeView",event)
    }

  }

  onEdit(squadra: Squadra) {
    this.squadra = squadra
    this.view = ViewIscirzione.CREA
  }

  onRiEdit(squadra: Squadra) {
    console.log("squadra",squadra)
    this.view = ViewIscirzione.UPGRADE_L
    this.squadra = squadra
    if (squadra.tipo == LOOKUPS.PROVENIENZA.FANTA)
      this.view = ViewIscirzione.UPGRADE_F

    if (squadra.tipo == LOOKUPS.PROVENIENZA.LISTONE)
      this.view = ViewIscirzione.UPGRADE_L
  }

}
