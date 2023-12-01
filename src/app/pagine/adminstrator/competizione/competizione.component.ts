import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { SUB_PAGE_ADMIN } from 'src/environments/environment';

@Component({
  selector: 'competizione',
  templateUrl: './competizione.component.html',
  styleUrls: ['./competizione.component.scss']
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
