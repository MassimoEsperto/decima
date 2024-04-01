import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { SUB_PAGE_ADMIN } from 'src/environments/costanti';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';
import { CaricaSquadreComponent } from './carica-squadre/carica-squadre.component';
import { ListaSvincolatiComponent } from './lista-svincolati/lista-svincolati.component';
import { SostituisciCalciatoreComponent } from './sostituisci-calciatore/sostituisci-calciatore.component';
import { NicknameCalciatoriComponent } from './nickname-calciatori/nickname-calciatori.component';
import { MyInfoCard } from 'src/app/componenti/my-info-card/my-info-card.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'calciatori',
  standalone: true,
  imports: [
    CaricaSquadreComponent,
    ListaSvincolatiComponent,
    SostituisciCalciatoreComponent,
    NicknameCalciatoriComponent,
    MyInfoCard,
    CommonModule
  ],
  templateUrl: './calciatori.component.html',
  styleUrl: './calciatori.component.scss'
})
export class CalciatoriComponent implements OnInit {

  administrator: any;

  info = {
    titolo: "CALCIATORI",
    desc: "IN QUESTA SEZIONE E' POSSIBILE GESTIRE LA LISTA DEI CALCIATORI"
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
