import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'recupero-formazioni',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule
  ],
  templateUrl: './recupero-formazioni.component.html',
  styleUrl: './recupero-formazioni.component.scss'
})
export class RecuperoFormazioniComponent {

  @Input() administrator: any;

  loading_btn: boolean = false
  giornata_selezionata: string = "";
  formazioni_inserite: any;

  constructor(
    private alert: AlertService,
    private adminService: AdminService) {
  }


  ngOnInit() {
    this.giornata_selezionata = this.administrator.calcolato['NO'][0]
  }


  recuperaFormazioneCasa(item: any) {

    let payload = {
      id_squadra: item.CASA.id_squadra,
      id_avversario: item.TRASFERTA.id_squadra,
      id_risultato: item.CASA.id_risultato,
      id_calendario: item.id_calendario,
      in_casa: 1
    }

    this.recuperoFormazione(payload);
  }

  recuperaFormazioneTrasferta(item: any) {

    let payload = {
      id_squadra: item.TRASFERTA.id_squadra,
      id_avversario: item.CASA.id_squadra,
      id_risultato: item.TRASFERTA.id_risultato,
      id_calendario: item.id_calendario,
      in_casa: 0
    }

    this.recuperoFormazione(payload);
  }


  formazioniInserite() {
    this.loading_btn = true;

    this.adminService.getFormazioniByGionata(this.giornata_selezionata)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.formazioni_inserite = result
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }


  recuperoFormazione(payload: any) {

    this.loading_btn = true;

    this.adminService.recuperoFormazione(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.formazioniInserite();
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  isSwitchs(item: any) {
    let casa = item.CASA.schieramento;
    let trasf = item.TRASFERTA.schieramento;

    return casa.some((a1: { id: any; }) =>
      trasf.some((a2: { id: any; }) => a1.id === a2.id));
  }


  updSwitchs(payload: any) {

    this.loading_btn = true;

    this.adminService.setSwitchs(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.formazioniInserite();
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }


  async recuperaTotaleFormazioni() {

    this.loading_btn = true;

    for (let item of this.formazioni_inserite) {

      if (item.CASA.schieramento.length != 5) {
        await this.recuperaFormazioneCasaItem(item)
      }

      if (item.TRASFERTA.schieramento.length != 5) {
        await this.recuperaFormazioneTrasfertaItem(item)
      }
    }

    await this.adminService.getFormazioniItem(this.giornata_selezionata)

    for (let item of this.formazioni_inserite) {

      if (this.isSwitchs(item)) {
        await this.adminService.setSwitchsItem(item)
      }
    }

    this.formazioniInserite();
  }


  async recuperaFormazioneCasaItem(item: any) {

    let payload = {
      id_squadra: item.CASA.id_squadra,
      id_avversario: item.TRASFERTA.id_squadra,
      id_risultato: item.CASA.id_risultato,
      id_calendario: item.id_calendario,
      in_casa: 1
    }

    await this.adminService.recuperoFormazioneItem(payload)
  }

  async recuperaFormazioneTrasfertaItem(item: any) {

    let payload = {
      id_squadra: item.TRASFERTA.id_squadra,
      id_avversario: item.CASA.id_squadra,
      id_risultato: item.TRASFERTA.id_risultato,
      id_calendario: item.id_calendario,
      in_casa: 0
    }

    await this.adminService.recuperoFormazioneItem(payload)
  }


}

