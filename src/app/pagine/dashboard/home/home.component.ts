import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { Utente } from 'src/app/classi/utente';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends OnInitComp implements OnInit {

  dash: any;
  loggato: Utente = new Utente();

  constructor(
    private playerService: PlayerService,
    private alert: AlertService,
    public language: LanguageService,
    public spinner: SpinnerService) {
    super();
  }





  ngOnInit() {
    this.spinner.view();
    this.loggato = this.playerService.getLoggato();

    this.getDashboard();
  }

  getDashboard() {
    this.playerService.getDashboard()
      .pipe(finalize(() => {

      }))
      .subscribe({
        next: (result: any) => {
          this.spinner.clear()
          this.dash = result
          this.dash.statistiche.loggato = this.loggato
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

}
