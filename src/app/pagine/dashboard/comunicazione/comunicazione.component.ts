import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthService } from 'src/servizi/client/auth.service';
import { PlayerService } from 'src/servizi/client/player.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';


@Component({
  selector: 'comunicazione',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './comunicazione.component.html',
  styleUrl: './comunicazione.component.scss'
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
