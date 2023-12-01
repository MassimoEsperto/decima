import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Utente } from 'src/app/classi/utente';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';

@Component({
  selector: 'scrivi-notifica',
  templateUrl: './scrivi-notifica.component.html',
  styleUrls: ['./scrivi-notifica.component.scss']
})
export class ScriviNotificaComponent implements OnInit {

  @Input() utenti: Utente[] =[];
  loading_btn: boolean = false;
  notifiche:any;

  constructor(
    private adminService: AdminService,
    public language: LanguageService,
    private alert: AlertService) {
  }

  ngOnInit() {}

  setComunicazione(payload: any) {

    this.loading_btn = true;

    this.adminService.setComunicazione(payload)
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



}
