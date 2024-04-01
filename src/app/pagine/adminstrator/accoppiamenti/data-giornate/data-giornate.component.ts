import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { BOLEANO } from 'src/environments/costanti';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { ConfirmDialogService } from 'src/servizi/local/confirm-dialog.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { ModalFormService } from 'src/servizi/local/modal-form.service';
import { UtilService } from 'src/servizi/local/util.service';


@Component({
  selector: 'data-giornate',
  standalone: true,
  imports: [
    MyButton,
    CommonModule
  ],
  templateUrl: './data-giornate.component.html',
  styleUrl: './data-giornate.component.scss',
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


