import { Component, Input } from '@angular/core';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { ConfirmDialogService } from 'src/app/servizi/confirm-dialog.service';
import { ModalFormService } from 'src/app/servizi/modal-form.service';

@Component({
  selector: 'eliminatorie',
  templateUrl: './eliminatorie.component.html',
  styleUrls: ['./eliminatorie.component.scss']
})
export class EliminatorieComponent {

  @Input() accoppiamenti: any;

  constructor(
    private adminService: AdminService,
    private alert: AlertService,
    private forms: ModalFormService,
    private confirmDialog: ConfirmDialogService,
  ) { }

  onUpdate(record: any, item: any) {
    this.forms.setData({ record })
  }


  onDelete(id: any) {

    this.confirmDialog.confirmThis("Sei sicuro di voler eliminare la partita ?", () => {

      console.log("delete ", id)
    })
  }

  onAddRecord() {
    this.forms.setData({})
  }

}
