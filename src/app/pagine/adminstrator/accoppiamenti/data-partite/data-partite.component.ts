import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/servizi/admin.service';
import { ConfirmDialogService } from 'src/app/servizi/confirm-dialog.service';
import { ModalFormService } from 'src/app/servizi/modal-form.service';

@Component({
  selector: 'data-partite',
  templateUrl: './data-partite.component.html',
  styleUrls: ['./data-partite.component.scss']
})
export class DataPartiteComponent implements OnInit {
 
  @Input() accoppiamenti: any;


  constructor(
    private adminService: AdminService,
    private forms: ModalFormService,
    private confirmDialog: ConfirmDialogService,
  ) { }

  
  ngOnInit() {
    
  }

  onUpdate(record: any) {
    this.forms.setData({ record })
  }


  onDelete(id: any) {

    this.confirmDialog.confirmThis("Sei sicuro di voler eliminare la giornata ?", () => {

      console.log("delete ", id)
    })
  }

  onAddRecord() {
    this.forms.setData({})
  }

}


