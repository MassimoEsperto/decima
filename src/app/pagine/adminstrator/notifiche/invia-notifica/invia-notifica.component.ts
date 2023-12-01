import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Utente } from 'src/app/classi/utente';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';

@Component({
  selector: 'invia-notifica',
  templateUrl: './invia-notifica.component.html',
  styleUrls: ['./invia-notifica.component.scss']
})
export class InviaNotificaComponent implements OnInit {

  @Input() utenti: Utente[] =[];
  loading_btn: boolean = false;
  notifiche:any;

  constructor(
    private adminService: AdminService,
    public language: LanguageService,
    private alert: AlertService) {
  }

  ngOnInit() {this.getComunicazioni()}


  associaComunicazione(payload: any) {

    this.loading_btn = true;

    this.adminService.associaComunicazione(payload)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }))
      .subscribe({
        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  getComunicazioni() {

    this.adminService.getAdministrator()
      .subscribe({
        next: (result: any) => {      
          this.notifiche=result.comunicazioni;
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }
 
}
