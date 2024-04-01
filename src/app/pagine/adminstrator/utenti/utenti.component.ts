import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { MyInfoCard } from 'src/app/componenti/my-info-card/my-info-card.component';
import { BOLEANO } from 'src/environments/costanti';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { ConfirmDialogService } from 'src/servizi/local/confirm-dialog.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { ModalFormService } from 'src/servizi/local/modal-form.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';


@Component({
  selector: 'utenti',
  standalone: true,
  imports: [
    MyInfoCard,
    CommonModule
  ],
  templateUrl: './utenti.component.html',
  styleUrl: './utenti.component.scss'
})
export class UtentiComponent implements OnInit {

  administrator: any;

  info = {
    titolo: "GESTIONE UTENTI",
    desc: "IN QUESTA SEZIONE E' POSSIBILE GESTIRE LO STATO DEGLI UTENTI E DELLE RELATIVE SQUADRE"
  }

  constructor(
    private adminService: AdminService,
    private alert: AlertService,
    public language: LanguageService,
    public spinner: SpinnerService,
    private forms: ModalFormService,
    private confirmDialog: ConfirmDialogService,
  ) { }


  ngOnInit() {
    this.getAdministrator()
  }


  onUpdate(record: any) {
    record.insert = false
    this.forms.setData(record, () => {
      this.getAdministrator()
    })
  }

  onInsert() {
    let record = { insert: true }
    this.forms.setData(record, () => {
      this.getAdministrator()
    })
  }

  OnSetCombo() {
    let lista = { boleano: BOLEANO, stati: this.administrator.stati_squadre, ruoli: this.administrator.ruoli }
    this.forms.setCombo({ lista })
  }


  getAdministrator() {

    this.spinner.view();

    this.adminService.getAdministrator()
      .pipe(finalize(() =>
        this.spinner.clear()
      ))
      .subscribe({

        next: (result: any) => {
          this.administrator = result
          this.OnSetCombo()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }


  onDelete(ele: any) {

    let payload = { id_squadra: ele.id_squadra }

    this.confirmDialog.confirmThis("Sei sicuro di voler eliminare la squadra " + ele.squadra + " ?", () => {

      console.log("delete ", payload)
      //this.deleteSquadra(payload)
    })
  }

  /* CHIAMATE AI SERVIZI */
  deleteSquadra(payload: any) {

    this.adminService.deleteSquadra(payload)
      .subscribe({
        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          this.getAdministrator()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }




  /* FINE CHIAMATE AI SERVIZI */


}
