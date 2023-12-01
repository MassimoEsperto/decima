import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { SUB_PAGE_ADMIN } from 'src/environments/environment';

@Component({
  selector: 'notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent implements OnInit {

  administrator: any;

  info = {
    titolo: "NOTIFICHE",
    desc: "IN QUESTA SEZIONE E' POSSIBILE COMPILARE ED INVIARE NOTIFICHE"
  }

  PAGE = SUB_PAGE_ADMIN


  constructor(
    private adminService: AdminService,
    private alert: AlertService,
    public spinner: SpinnerService
  ) { }

  ngOnInit() {
    this.getAdministrator()
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
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }


}
