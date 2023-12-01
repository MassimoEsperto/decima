import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { Utente } from 'src/app/classi/utente';
import { AlertService } from 'src/app/servizi/alert.service';
import { FantaGazzettaService } from 'src/app/servizi/fanta-gazzetta.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';

@Component({
  selector: 'upgrade-squadra',
  templateUrl: './upgrade-squadra.component.html',
  styleUrls: ['./upgrade-squadra.component.scss']
})
export class UpgradeSquadraComponent extends OnInitComp implements OnInit {

  loggato: Utente = new Utente();
  svincolati: any;
  rosa_aggiornata:any = []
 

  constructor(
    private alert: AlertService,
    private fanta: FantaGazzettaService,
    public spinner: SpinnerService,
    public language: LanguageService,
    private router: Router,
    private playerService: PlayerService) {
    super();
  }

  selected() {
    return this.rosa_aggiornata ? this.rosa_aggiornata.filter((e: { selected: boolean; }) => e.selected === true) : [];
  }

  attacco() {
    return this.rosa_aggiornata ? this.rosa_aggiornata.filter((e: { ruolo: string; }) => e.ruolo === 'A') : [];
  }

  ngOnInit() {
    this.loggato = this.playerService.getLoggato();
    this.onStart()
  }

  onStart() {
    this.spinner.view();
    this.getInfoUtente()
  }

  getInfoUtente() {

    this.loading_btn = true

    this.playerService.getInfoUtente()
      .pipe(finalize(() => {
        this.loading_btn = false
      }))
      .subscribe({
        next: (result: any) => {
          this.svincolati = result.lista_calciatori
          if(this.loggato.selezionata)
          this.getLega(this.loggato.selezionata.lega)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }



  getLega(lega: string) {

    this.fanta.getLega(lega)
      .subscribe({
        next: (result: any) => {

          if (result && result.length > 0) {
            if(this.loggato.selezionata){
            let account = this.loggato.selezionata.account
            let fantalega = result.find((i: { team: string; }) => i.team == account).lista || [];
            this.onLega(fantalega)
            }
          } else {
            this.alert.error("Lega inesistente");
            this.spinner.clear();
          }
        },
        error: (error: any) => {
          this.alert.error(error);
        },
      })
  }

  onLega(lega:any) {

    this.rosa_aggiornata = []
    for (let ele of lega) {
      let singolo:any = this.svincolati.find((i: { nome_calciatore: any; }) => i.nome_calciatore == ele);
      if (singolo) {
        singolo['selected'] = true;
        this.rosa_aggiornata.push(singolo)
      }
    }
    this.spinner.clear();
  }


  disabledTeam(item:any) {

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

  confermaUpgrade() {

    let payload = {
      lista: this.selected(),
      lega: this.loggato.selezionata ? this.loggato.selezionata.lega : ""
    }

    this.upgradeRosa(payload)
  }

  upgradeRosa(payload: any) {

    this.loading_btn = true;

    this.playerService.upgradeRosa(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          setTimeout(() => {
            this.router.navigate(['/dashboard/squadre']);
          }, 2000);
          
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }


}
