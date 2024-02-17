import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { Squadra } from 'src/app/classi/squadra';
import { AlertService } from 'src/app/servizi/alert.service';
import { FantaGazzettaService } from 'src/app/servizi/fanta-gazzetta.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { ViewIscirzione } from 'src/environments/enums';

@Component({
  selector: 'upgrade-squadra-fanta',
  templateUrl: './upgrade-squadra-fanta.component.html',
  styleUrls: ['./upgrade-squadra-fanta.component.scss']
})
export class UpgradeSquadraFantaComponent extends OnInitComp implements OnChanges {

  @Output() change = new EventEmitter();
  @Input() squadra: Squadra = new Squadra(0, '', '', '', '', '', 0);

  svincolati: any;
  rosa_aggiornata: any = []


  constructor(
    private alert: AlertService,
    private fanta: FantaGazzettaService,
    public spinner: SpinnerService,
    public language: LanguageService,
    private router: Router,
    private playerService: PlayerService) {
    super();
  }

  ngOnChanges() {
    if (this.squadra.id_squadra > 0) {
      this.spinner.view();
      this.getInfoUtente()
    }

  }

  selected() {
    return this.rosa_aggiornata ? this.rosa_aggiornata.filter((e: { selected: boolean; }) => e.selected === true) : [];
  }

  attacco() {
    return this.rosa_aggiornata ? this.rosa_aggiornata.filter((e: {
      selected: boolean; ruolo: string; 
}) => e.selected === true && e.ruolo === 'A') : [];
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
          this.getLega(this.squadra.lega)
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

            let account = this.squadra.account
            let fantalega = result.find((i: { team: string; }) => i.team == account).lista || [];
            this.onLega(fantalega)

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

  onLega(lega: any) {

    this.rosa_aggiornata = []
    for (let ele of lega) {
      let singolo: any = this.svincolati.find((i: { nome_calciatore: any; }) => i.nome_calciatore == ele);
      if (singolo) {
        singolo['selected'] = true;
        this.rosa_aggiornata.push(singolo)
      }
    }
 
    this.spinner.clear();
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

  confermaUpgrade() {

    let payload = {
      lista: this.selected(),
      lega: this.squadra.lega
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

  esci() {
    this.change.emit(ViewIscirzione.LISTA)
  }


}
