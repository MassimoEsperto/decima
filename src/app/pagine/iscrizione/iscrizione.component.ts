import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Squadra } from 'src/app/classi/squadra';
import { AuthService } from 'src/app/servizi/auth.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { FasiCompetizione, TipoSquadra, ViewIscirzione } from 'src/environments/enums';

@Component({
  selector: 'iscrizione',
  templateUrl: './iscrizione.component.html',
  styleUrls: ['./iscrizione.component.scss']
})
export class IscrizioneComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    public spinner: SpinnerService) {
  }


  ngOnInit() {
    this.getInfoUtente()
  }

  VIEW_ISCRIZIONE = ViewIscirzione;
  fase: number = 0;
  view: number = 0
  squadra: Squadra = new Squadra(0, '', '', '', '', '', 0);


  getInfoUtente() {

    this.fase = this.authService.getLoggato().fase || 0;

    if (this.fase == FasiCompetizione.ISCRIZIONE || this.fase == FasiCompetizione.MERCATO) {
      this.view = ViewIscirzione.LISTA
    } else {
      this.goBack()
    }
  }

  goBack() {
    this.router.navigate(['login']);
  }

  changeView(event: any) {

    if (!isNaN(event)) {
      this.view = event
      this.squadra = new Squadra(0, '', '', '', '', '', 0);
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
