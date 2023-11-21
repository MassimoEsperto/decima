import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { AlertService } from 'src/app/servizi/alert.service';
import { AuthService } from 'src/app/servizi/auth.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';

@Component({
  selector: 'comunicazione',
  templateUrl: './comunicazione.component.html',
  styleUrls: ['./comunicazione.component.scss']
})
export class ComunicazioneComponent {

  comunicazioni: any;

  constructor(
    private playerService: PlayerService,
    public language: LanguageService,
    public spinner: SpinnerService,
    private authService: AuthService,
    private alert: AlertService) {
  }

  ngOnInit() {
    this.spinner.view();
    this.getComunicazioni();
  }

  getComunicazioni() {
    this.playerService.getCommunicazioni()
      .pipe(finalize(() => {
        this.spinner.clear();
      }))
      .subscribe({
        next: (result: any) => {
          this.comunicazioni = result
          this.readComunicazioni();
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  readComunicazioni() {
    let token = this.playerService.getLocalStorageParse();
    token.num_msg = 0
    this.authService.setToken(token);
  }



}
