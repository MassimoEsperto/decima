import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { AlertService } from 'src/app/servizi/alert.service';
import { FantaGazzettaService } from 'src/app/servizi/fanta-gazzetta.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';

@Component({
  selector: 'schieramento',
  templateUrl: './schieramento.component.html',
  styleUrls: ['./schieramento.component.scss']
})
export class SchieramentoComponent extends OnInitComp implements OnInit {

  constructor(
    public spinner: SpinnerService,
    public language: LanguageService,
    private alert: AlertService,
    private router: Router,
    private playerService: PlayerService,
    private fantaService: FantaGazzettaService,
    private ref: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {

    this.spinner.view();
    this.getProbabiliFormazione()
  }

  ngAfterViewInit() { }

  ngAfterViewChecked() {
    this.ref.detectChanges();
  }

  selected() {
    return this.rosa ? this.rosa.filter((e: { selected: boolean; }) => e.selected === true) : [];
  }



  //dichiara le variabili
  formazione: any;
  percentuale: any;
  squadra: any = [];
  schieramento: boolean = true;
  moduli: any = [];
  modulo: any;

  rosa: any;


  getProbabiliFormazione() {

    this.fantaService.getProbabiliFormazione()
      .pipe(finalize(() => {
        this.getConvocabili();
      }))
      .subscribe({

        next: (result: any) => {

          this.percentuale = result

        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })
  }



  changeView() {
    this.schieramento = !this.schieramento;
    this.aggiornaModulo()
  }

  aggiornaModulo() {

    let indice = this.squadra.length > 0 ? "" : "NNNNN";
    for (let ele of this.squadra) {
      indice += ele.tipo
    }

    this.modulo = this.moduli[indice]
  }


  getConvocabili() {

    this.playerService.getConvocabili()
      .pipe(finalize(() => {
        this.spinner.clear();
      }))
      .subscribe({

        next: (result: any) => {

          this.formazione = result
          this.squadra = result.schierata
          this.moduli = result.moduli
          this.aggiornaModulo()

          this.rosa = result.rosa

        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  //inserisce materialmente nel db la formazione
  setFormazione() {

    this.loading_btn = true;
    let payload: any = {
      lista: [],
      id_risultato: this.formazione.id_risultato,
      id_modulo: this.modulo.id
    }

    for (let membro of this.squadra) {
      payload.lista.push(membro.id)
    }

    this.playerService.insertFormazione(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          setTimeout(() => {
            this.router.navigate(['dashboard/home']);
          }, 3000);

        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }


  schiera() {

    this.squadra = this.selected();
    this.changeView();
    this.alert.info(this.language.label.alert.schieramento);
  }


  disabledTeam(item: any) {

    let selected = this.selected();

    let size = selected.length;

    if (size > 4)
      return false;

    if (size == 0)
      return true;

    try {

      let centro = selected.filter((e: { tipo: string; }) => e.tipo === 'C').length;
      let difensori = selected.filter((e: { tipo: string; }) => e.tipo === 'D').length;
      let attaccanti = selected.filter((e: { tipo: string; }) => e.tipo === 'A').length;
      let portieri = selected.filter((e: { tipo: string; }) => e.tipo === 'P').length;


      switch (item.tipo) {
        case 'P': {
          return portieri < 1 && (size < 4 || (centro > 0 && attaccanti > 0 && difensori > 0));
        }
        case 'D': {
          return difensori < 2 && (size < 4 || (centro > 0 && attaccanti > 0));
        }
        case 'C': {
          return centro < 2 && (size < 4 || (difensori > 0 && attaccanti > 0));
        }
        case 'A': {
          return attaccanti < 2 && (size < 4 || (centro > 0 && difensori > 0));
        }
        default: {
          return true;
        }
      }

    } catch (error) {
      return true;
    }

  }

}
