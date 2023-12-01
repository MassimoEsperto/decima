import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { ConfirmDialogService } from 'src/app/servizi/confirm-dialog.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { ModalFormService } from 'src/app/servizi/modal-form.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';

@Component({
  selector: 'utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent implements OnInit {

  squadre: any;

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
    this.getSquadreUtenti()
  }


  getSquadreUtenti() {

    this.spinner.view();

    this.adminService.getAdministrator()
      .pipe(finalize(() =>
        this.spinner.clear()
      ))
      .subscribe({

        next: (result: any) => {
          this.squadre = result.squadre
          console.log("squadre", this.squadre)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  onUpdUtente(record: any) {
    this.forms.setData({ record })
  }


  onDelete(ele: any) {

    this.confirmDialog.confirmThis("Sei sicuro di voler eliminare la squadra " + ele.squadra + " ?", () => {

      console.log("delete ", ele.id_squadra
      )
    })
  }

  /* CHIAMATE AI SERVIZI */
  remove(id: any, id_utente: string) {

    this.adminService.deleteUtente(id_utente)
      .subscribe({
        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          this.getSquadreUtenti()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }


  updDetailUtente(user: any) {

    this.adminService.updDetailUtente(user)
      .subscribe({
        next: (result: any) => {

          this.alert.success(this.language.label.alert.success);
          this.getSquadreUtenti()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  /* FINE CHIAMATE AI SERVIZI */


}
