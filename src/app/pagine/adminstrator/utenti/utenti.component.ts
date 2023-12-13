import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { ConfirmDialogService } from 'src/app/servizi/confirm-dialog.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { ModalFormService } from 'src/app/servizi/modal-form.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { BOLEANO } from 'src/environments/environment';

@Component({
  selector: 'utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
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
