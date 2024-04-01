import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Utente } from 'src/app/classi/utente';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'scrivi-notifica',
  standalone: true,
  imports: [
    MyButton,
    FormsModule
  ],
  templateUrl: './scrivi-notifica.component.html',
  styleUrl: './scrivi-notifica.component.scss'
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
