import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { Squadra } from 'src/app/classi/squadra';
import { Utente } from 'src/app/classi/utente';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { MyTitolo } from 'src/app/componenti/my-titolo/my-titolo.component';
import { AuthService } from 'src/servizi/client/auth.service';
import { PlayerService } from 'src/servizi/client/player.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';


@Component({
  selector: 'info-utente',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    MyTitolo,
    CommonModule
  ],
  templateUrl: './info-utente.component.html',
  styleUrl: './info-utente.component.scss'
})
export class InfoUtenteComponent extends OnInitComp implements OnInit {

  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    private alert: AlertService,
    public language: LanguageService,
    public spinner: SpinnerService) {
    super();
  }

  avatars: any = [];
  loggato: Utente = new Utente();
  avatarSel: any;

  squadra: any;

  id_selected: number = 0;
  squadre: Array<Squadra> = [];


  ngOnInit() {

    this.loggato = this.playerService.getLoggato();
  
    this.id_selected = this.loggato.selezionata ? this.loggato.selezionata.id_squadra : 0

    this.getAvatars()

  }


  getAvatars() {

    this.spinner.view();

    this.playerService.getAvatars()
      .pipe(finalize(() => {
        this.spinner.clear()
      }))
      .subscribe({
        next: (result: any) => {
          this.avatars = result;
          this.preselect();
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  selectedCombo(item: any) {
    this.avatarSel = item;
    if (this.loggato.selezionata) {
      this.loggato.selezionata.avatar = item.nome
      this.loggato.selezionata.id_avatar = item.id_avatar
    }
  }


  preselect() {
    let id = this.loggato.selezionata ? this.loggato.selezionata.id_avatar : "1"
    this.avatarSel = this.avatars.find((x: { id_avatar: string; }) => x.id_avatar == id)
  }

  onChangeTeam(id_element: number) {

    if (this.loggato.squadre && this.loggato.squadre.length>0) {
 
      let selezionata:any = this.loggato.squadre.find(x => x.id_squadra == id_element)
      this.changeTeam(selezionata)

    }
  }

  changeTeam(element: Squadra) {

    this.loading_btn = true;
    let utente: Utente = this.playerService.getLoggato();
    utente.selezionata = element
    this.playerService.updateUtente(utente)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {

          this.authService.setTokenDecoded(result);
          this.alert.success(this.language.label.alert.success);
          this.authService.refreshPage();
        },
        error: (error: any) => {
          this.alert.error(error);
        },

      })
  }



  updateAvatar() {

    this.loading_btn = true;
    let utente: Utente = this.playerService.getLoggato();
    if(utente.selezionata && this.loggato.selezionata)
    utente.selezionata.id_avatar = this.loggato.selezionata.id_avatar
    this.playerService.updateUtente(utente)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {

          let token:any = this.playerService.getLocalStorageParse();
          token.selezionata = this.loggato.selezionata
          this.authService.setToken(token);
          this.alert.success(this.language.label.alert.success);
          this.authService.refreshPage();
        },
        error: (error: any) => {
          this.alert.error(error);
        },

      })
  }


  updateUtente(element: Utente) {

    this.loading_btn = true;

    this.playerService.updateUtente(element)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {

          let token:any = this.playerService.getLocalStorageParse();
          token.username = element.username;
          token.email = element.email;
          token.cellulare = element.cellulare;
          token.selezionata = element.selezionata;
          this.authService.setToken(token);
          this.alert.success(this.language.label.alert.success);
          this.authService.refreshPage();
        },
        error: (error: any) => {
          this.alert.error(error);
        },

      })
  }


}


