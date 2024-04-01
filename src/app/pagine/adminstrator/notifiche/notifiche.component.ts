import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { MyInfoCard } from 'src/app/componenti/my-info-card/my-info-card.component';
import { SUB_PAGE_ADMIN } from 'src/environments/costanti';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';
import { ScriviNotificaComponent } from './scrivi-notifica/scrivi-notifica.component';
import { InviaNotificaComponent } from './invia-notifica/invia-notifica.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'notifiche',
  standalone: true,
  imports: [
    MyInfoCard,
    ScriviNotificaComponent,
    InviaNotificaComponent,
    CommonModule
  ],
  templateUrl: './notifiche.component.html',
  styleUrl: './notifiche.component.scss'
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
