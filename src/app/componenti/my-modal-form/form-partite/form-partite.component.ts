import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { UtilService } from 'src/servizi/local/util.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-partite',
  templateUrl: './form-partite.component.html',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule
  ],
  styleUrl: './form-partite.component.scss',
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
