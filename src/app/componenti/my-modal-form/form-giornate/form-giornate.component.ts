import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { UtilService } from 'src/app/servizi/util.service';

@Component({
  selector: 'form-giornate',
  templateUrl: './form-giornate.component.html',
  styleUrls: ['./form-giornate.component.scss'],
  providers: [UtilService],
})
export class FormGiornate {

  @Output() mySubmit = new EventEmitter();
  @Input() data: any;
  @Input() combo: any;
  loading_btn: boolean = false

  constructor(
    private adminService: AdminService,
    public language: LanguageService,
    private alert: AlertService,
    private util: UtilService
  ) { }


  successo() {

    this.alert.success(this.language.label.alert.success);
    this.mySubmit.emit(true)
    this.util.clodeModal()

  }

  updateGiornata(payload: any) {

    this.adminService.cambiaDate(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({
        next: (result: any) => {
          this.successo()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  insertGiornata(payload: any) {

    this.adminService.newData(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({
        next: (result: any) => {
          this.successo()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }


  OnSetGiornata(input: any) {

    this.loading_btn = true

    let payload = {
      giornata: input.giornata,
      serie_a: input.serie_a,
      inizio_giornata: input.inizio_giornata.replace("T", " "),
      prima_partita: input.prima_partita.replace("T", " "),
      ultima_partita: input.ultima_partita.replace("T", " "),
      fine_giornata: input.fine_giornata.replace("T", " "),
      is_upgrade: input.is_upgrade,
      fase: input.fase
    }

    if (this.data.insert) {
      this.insertGiornata(payload)
    } else {
      this.updateGiornata(payload)
    }
  }


}

