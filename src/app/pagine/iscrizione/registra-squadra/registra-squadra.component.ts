import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { AlertService } from 'src/app/servizi/alert.service';
import { AuthService } from 'src/app/servizi/auth.service';
import { FantaGazzettaService } from 'src/app/servizi/fanta-gazzetta.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';

@Component({
  selector: 'registra-squadra',
  templateUrl: './registra-squadra.component.html',
  styleUrls: ['./registra-squadra.component.scss']
})
export class RegistraSquadraComponent implements OnInit {

  @Output() change = new EventEmitter();

  fantalega: any;
  calciatori: any;
  loading_btn: boolean = false;
  rosa_aggiornata: any = []
  stepform = 1

  payload: any = {
    squadra: "",
    id_utente: "",
    lega: "",
    account: "",
    players: []
  }


  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    public language: LanguageService,
    private fantaService: FantaGazzettaService,
    private alert: AlertService) {
  }



  ngOnInit() {
    this.payload.id_utente = this.playerService.getLoggato().id;
    this.getInfoUtente();
  }

  selected() {
    return this.rosa_aggiornata ? this.rosa_aggiornata.filter((e: { selected: boolean; }) => e.selected === true) : [];
  }

  attacco() {
    return this.rosa_aggiornata ? this.rosa_aggiornata.filter((e: { ruolo: string; }) => e.ruolo === 'A') : [];
  }

  getInfoUtente() {

    this.loading_btn = true

    this.playerService.getInfoUtente()
      .pipe(finalize(() => {
        this.loading_btn = false
      }))
      .subscribe({
        next: (result: any) => {
          this.calciatori = result.lista_calciatori
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }


  getLega(lega: string) {

    this.loading_btn = true
    let re = /\ /gi;
    let nome_lega = lega.replace(re, "-")

    this.fantaService.getLega(nome_lega)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {

          this.fantalega = result

          if (this.fantalega && this.fantalega.length > 0) {
            if (this.fantalega.length >= 8) {
              //this.fantalega['lega'] = nome_lega
              this.payload.lega = nome_lega
              this.stepform += 1
            } else {
              this.alert.error("La lega deve avere un minimo di 8 partecipanti");
            }
          } else {
            this.alert.error("Lega inesistente");
          }
        },
        error: (error: any) => {
          this.alert.error(error);
        },
      })
  }


  registraSquadra(payload: any) {

    this.loading_btn = true;

    this.authService.registraSquadra(payload)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          this.change.emit('cambia')
        },
        error: (error: any) => {
          this.alert.error(error);
        },
      })
  }



  onRegistraSquadra() {
    this.registraSquadra(this.payload)
  }


  onLega(lega: any) {

    //this.fantalega['account'] = lega.team
    this.payload.account = lega.team
    this.loading_btn = true
    this.rosa_aggiornata = []
    for (let ele of lega.lista) {
      let singolo = this.calciatori.find((i: { nome_calciatore: any; }) => i.nome_calciatore == ele);
      if (singolo) {
        singolo['selected'] = true;
        this.rosa_aggiornata.push(singolo)
      }
    }

    setTimeout(() => {
      this.loading_btn = false
      this.stepform += 1
    }, 1000);

  }

  disabledTeam(item: any) {

    let selected = this.selected();

    let size = selected.length;

    if (size == 25) return true;

    try {

      let centro = selected.filter((e: { ruolo: string; }) => e.ruolo === 'C').length;
      let difensori = selected.filter((e: { ruolo: string; }) => e.ruolo === 'D').length;
      let attaccanti = selected.filter((e: { ruolo: string; }) => e.ruolo === 'A').length;
      let portieri = selected.filter((e: { ruolo: string; }) => e.ruolo === 'P').length;

      switch (item.ruolo) {
        case 'P': {
          return portieri == 3;
        }
        case 'D': {
          return difensori == 8;
        }
        case 'C': {
          return centro == 8;
        }
        case 'A': {
          return attaccanti == 6;
        }
        default: {
          return false;
        }
      }

    } catch (error) {
      return false;
    }

  }

  confermaSquadra() {

    this.payload.players = this.selected()
    this.stepform += 1

  }


}


