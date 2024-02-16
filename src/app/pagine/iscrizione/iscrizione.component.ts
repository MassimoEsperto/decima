import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Squadra } from 'src/app/classi/squadra';
import { AlertService } from 'src/app/servizi/alert.service';
import { AuthService } from 'src/app/servizi/auth.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { TipoSquadra, ViewIscirzione } from 'src/environments/enums';

@Component({
  selector: 'iscrizione',
  templateUrl: './iscrizione.component.html',
  styleUrls: ['./iscrizione.component.scss']
})
export class IscrizioneComponent implements OnInit {

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private alert: AlertService,
    private authService: AuthService,
    public spinner: SpinnerService) {
  }


  ngOnInit() {
    this.getInfoUtente()
  }

  VIEW_ISCRIZIONE = ViewIscirzione;
  view: number = 0
  squadra: Squadra = new Squadra(0, '', '', '', '', '', 0);
  is_mercato: boolean = false

  getInfoUtente() {

    this.spinner.view();

    this.playerService.getInfoUtente()
      .pipe(finalize(() => {
        this.spinner.clear()
      }))
      .subscribe({
        next: (result: any) => {
          console.log("getInfoUtente", result)

          if (result.turno.is_upgrade == '1') {
            this.is_mercato = true
            this.view = ViewIscirzione.LISTA
          } else {
            if (this.authService.isGhost()) {
              this.view = ViewIscirzione.LISTA
            } else {
              this.goBack()
            }
          }
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
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
