import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { UtilService } from 'src/app/servizi/util.service';

@Component({
  selector: 'form-partite',
  templateUrl: './form-partite.component.html',
  styleUrls: ['./form-partite.component.scss'],
  providers: [UtilService],
})
export class FormPartite {

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

  updateAccoppiamento(payload: any) {

    this.adminService.updAccoppiamento(payload)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }))
      .subscribe({
        next: (result: any) => {
          this.successo()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  insertAccoppiamento(payload: any) {

    this.adminService.setAccoppiamento(payload)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }))
      .subscribe({
        next: (result: any) => {
          this.successo()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  OnSetAccoppiamento(input: any) {

    this.loading_btn = true

    let payload = {
      id_casa: input.id_casa,
      id_trasferta: input.id_trasferta,
      giornata: input.giornata,
      id_calendario: input.id_calendario

    }

    if (this.data.insert) {
      this.insertAccoppiamento(payload)
    } else {
      this.updateAccoppiamento(payload)
    }
  }



}
