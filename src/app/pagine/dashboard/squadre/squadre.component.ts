import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { ALERT_MSG } from 'src/environments/environment';

@Component({
  selector: 'squadre',
  templateUrl: './squadre.component.html',
  styleUrls: ['./squadre.component.scss']
})
export class SquadreComponent extends OnInitComp implements OnInit {

  rose: any;

  constructor(
    private playerService: PlayerService,
    private alert: AlertService,
    public language: LanguageService,
    public spinner: SpinnerService) {
    super();
  }

  ngOnInit(): void {this.getSquadre() }


  getSquadre() {

    this.spinner.view();

    this.playerService.getListaRose()
      .pipe(finalize(() =>
        this.spinner.clear()
      ))
      .subscribe({

        next: (result: any) => {
          this.rose = result
          console.log("this.squadre", this.rose)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

}

