import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/servizi/local/modal.service';


@Component({
  selector: 'form-utenti',
  templateUrl: './form-utenti.component.html',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule
  ],
  styleUrl: './form-utenti.component.scss',
  providers: [ModalService],
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
    private modale: ModalService
  ) { }


  successo() {

    this.alert.success(this.language.label.alert.success);
    this.mySubmit.emit(true)
    this.modale.clodeModal()

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
