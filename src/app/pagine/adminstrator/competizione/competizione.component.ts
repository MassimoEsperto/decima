import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { SUB_PAGE_ADMIN } from 'src/environments/costanti';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';
import { RecuperoFormazioniComponent } from './recupero-formazioni/recupero-formazioni.component';
import { CalcoloVotiComponent } from './calcolo-voti/calcolo-voti.component';
import { MyInfoCard } from 'src/app/componenti/my-info-card/my-info-card.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'competizione',
  standalone: true,
  imports: [
    RecuperoFormazioniComponent,
    CalcoloVotiComponent,
    MyInfoCard,
    CommonModule
  ],
  templateUrl: './competizione.component.html',
  styleUrl: './competizione.component.scss'
})
export class CompetizioneComponent implements OnInit {

  administrator: any;
  info = {
    titolo: "COMPETIZIONE",
    desc: "IN QUESTA SEZIONE E' POSSIBILE SIA CALCOLARE I VOTI DI GIORNATA CHE RECUPERARE LE FORMAZIONI PRECEDENTEMENTE INSERITE"
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
