import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { UtilService } from 'src/app/servizi/util.service';

@Component({
  selector: 'form-utenti',
  templateUrl: './form-utenti.component.html',
  styleUrls: ['./form-utenti.component.scss'],
  providers: [UtilService],
})
export class FormUtenti {

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

  updateUtente(payload: any) {

    this.adminService.updDetailUtente(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({
        next: (result: any) => {

          this.alert.success(this.language.label.alert.success);
          this.successo()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }


  OnSetUtente(payload: any) {

    this.loading_btn = true

    if (this.data.insert) {
      console.log("Insert non presente")
    } else {
      payload.id_utente = this.data.id_utente
      this.updateUtente(payload)
    }
  }



}
