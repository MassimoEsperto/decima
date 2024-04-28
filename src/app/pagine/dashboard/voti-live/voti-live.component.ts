import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { MyTitolo } from 'src/app/componenti/my-titolo/my-titolo.component';
import { FantaGazzettaService } from 'src/servizi/client/fanta-gazzetta.service';
import { PlayerService } from 'src/servizi/client/player.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';


@Component({
  selector: 'voti-live',
  standalone: true,
  imports: [
    MyTitolo,
    CommonModule
  ],
  templateUrl: './voti-live.component.html',
  styleUrl: './voti-live.component.scss'
})
export class VotiLiveComponent implements OnInit {

  rose: any;

  constructor(
    private playerService: PlayerService,
    private alert: AlertService,
    public language: LanguageService,
    private fantaService: FantaGazzettaService,
    public spinner: SpinnerService) {
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
