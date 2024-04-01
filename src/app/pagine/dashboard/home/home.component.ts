import { AfterContentInit, Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { Utente } from 'src/app/classi/utente';
import { MyTitolo } from 'src/app/componenti/my-titolo/my-titolo.component';
import { PlayerService } from 'src/servizi/client/player.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';
import { StatisticheComponent } from './statistiche/statistiche.component';
import { PrePartitaComponent } from './pre-partita/pre-partita.component';
import { PostPartitaComponent } from './post-partita/post-partita.component';
import { PartitaIncorsoComponent } from './partita-incorso/partita-incorso.component';
import { CommonModule } from '@angular/common';
import { MyLogo } from 'src/app/componenti/my-logo/my-logo.component';


@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MyTitolo,
    StatisticheComponent,
    PrePartitaComponent,
    PostPartitaComponent,
    PartitaIncorsoComponent,
    CommonModule,
    MyLogo
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends OnInitComp implements OnInit, AfterContentInit {

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
  }

  //aggiunto per il reload
  ngAfterContentInit() {
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
