import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { ConfirmDialogService } from 'src/servizi/local/confirm-dialog.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { ModalFormService } from 'src/servizi/local/modal-form.service';


@Component({
  selector: 'partite',
  standalone: true,
  imports: [
    MyButton,
    CommonModule
  ],
  templateUrl: './partite.component.html',
  styleUrl: './partite.component.scss'
})
export class PartiteComponent implements OnInit {

  @Input() accoppiamenti: any;
  @Output() aggiorna = new EventEmitter();

  constructor(
    private adminService: AdminService,
    private forms: ModalFormService,
    private confirmDialog: ConfirmDialogService,
    private alert: AlertService,
    public language: LanguageService,
  ) { }

  ngOnInit() {

    let lista = { squadre: this.accoppiamenti.squadre }
    this.forms.setCombo({ lista })

  }

  onUpdate(input: any, item: any) {

    let record = {
      id_casa: input.CASA.id_squadra,
      id_trasferta: input.TRASFERTA.id_squadra,
      giornata: item.giornata,
      id_calendario: input.id_calendario,
      insert: false
    }

    this.forms.setData(record, () => {
      this.aggiorna.emit(true)
    })

  }


  onInsert() {
    let record = { insert: true }
    this.forms.setData(record, () => {
      this.aggiorna.emit(true)
    })
  }


  onDelete(id: any) {

    let payload = {
      tabella: "calendario",
      id_nome: "id_calendario",
      id_valore: id
    }

    this.confirmDialog.confirmThis("Sei sicuro di voler eliminare la partita ", () => {

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
