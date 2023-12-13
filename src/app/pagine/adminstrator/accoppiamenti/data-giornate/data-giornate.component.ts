import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { ConfirmDialogService } from 'src/app/servizi/confirm-dialog.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { ModalFormService } from 'src/app/servizi/modal-form.service';
import { UtilService } from 'src/app/servizi/util.service';
import { BOLEANO } from 'src/environments/environment';

@Component({
  selector: 'data-giornate',
  templateUrl: './data-giornate.component.html',
  styleUrls: ['./data-giornate.component.scss'],
  providers: [UtilService],
})
export class DataGiornateComponent implements OnInit {

  @Input() accoppiamenti: any;
  @Output() aggiorna = new EventEmitter();


  constructor(
    private adminService: AdminService,
    public language: LanguageService,
    private forms: ModalFormService,
    private confirmDialog: ConfirmDialogService,
    public util: UtilService,
    private alert: AlertService,
  ) {
  }


  ngOnInit() {

    let lista = { fasi: this.accoppiamenti.fasi, boleano: BOLEANO }
    this.forms.setCombo({ lista })

  }


  onInsert() {
    let record = { insert: true }
    this.forms.setData(record, () => {
      this.aggiorna.emit(true)
    })

  }

  onUpdate(record: any) {
    record.insert = false

    this.forms.setData(record, () => {
      this.aggiorna.emit(true)
    })

  }


  onDelete(id: any) {

    let payload = {
      tabella: "giornate",
      id_nome: "id_giornata",
      id_valore: id
    }

    this.confirmDialog.confirmThis("Sei sicuro di voler eliminare la giornata ?", () => {

      this.deleteData(payload);

    })
  }


  deleteData(payload: any) {

    this.adminService.deleteObjectById(payload)
      .subscribe({
        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }



}


