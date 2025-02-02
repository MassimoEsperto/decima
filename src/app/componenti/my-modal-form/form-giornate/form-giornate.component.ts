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
  selector: 'form-giornate',
  templateUrl: './form-giornate.component.html',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule],
  styleUrl: './form-giornate.component.scss',
  providers: [ModalService],
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
    private modale: ModalService
  ) { }


  successo() {

    this.alert.success(this.language.label.alert.success);
    this.mySubmit.emit(true)
    this.modale.clodeModal()

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
      //ultima_partita: input.ultima_partita.replace("T", " "),
      //fine_giornata: input.fine_giornata.replace("T", " "),
      is_upgrade: input.is_upgrade,
      turno: input.turno
    }

    if (this.data.insert) {
      this.insertGiornata(payload)
    } else {
      this.updateGiornata(payload)
    }
  }


}

