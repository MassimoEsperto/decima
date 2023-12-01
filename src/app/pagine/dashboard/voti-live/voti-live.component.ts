import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { AlertService } from 'src/app/servizi/alert.service';
import { FantaGazzettaService } from 'src/app/servizi/fanta-gazzetta.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';

@Component({
  selector: 'voti-live',
  templateUrl: './voti-live.component.html',
  styleUrls: ['./voti-live.component.scss']
})
export class VotiLiveComponent extends OnInitComp implements OnInit {

  rose: any;

  constructor(
    private playerService: PlayerService,
    private alert: AlertService,
    public language: LanguageService,
    private fantaService: FantaGazzettaService,
    public spinner: SpinnerService) {
    super();
  }

  formazioni: any
  votilive: any

  ngOnInit() {
    this.getLivefanta();
  }

  getLivefanta() {

    this.spinner.view();

    this.fantaService.getLiveFormazione()
      .pipe(finalize(() => {
        this.getLiveformazioni();
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.votilive = result;
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  getLiveformazioni() {

    this.playerService.getFormazioniInserite()
      .pipe(finalize(() => {
        this.spinner.clear()
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.formazioni = result;
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }


}
