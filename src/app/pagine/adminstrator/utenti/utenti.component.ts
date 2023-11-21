import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';

@Component({
  selector: 'utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent implements OnInit {

  constructor(  private adminService: AdminService) { }

  ngOnInit() {
    this.getUtenti()
    this.getFormazioniByGionata()
  }



  getUtenti() {

    this.adminService.getAdministrator()
      .pipe(finalize(() =>
        //this.loading_btn = false
        console.log("result new ")
      ))
      .subscribe({

        next: (result: any) => {
          console.log("result new ",result)
        },
        error: (error: any) => {
          //this.alert.error(error);
          console.log(error)
        }
      })

  }

  getFormazioniByGionata() {

    this.adminService.getFormazioniByGionata("1")
      .pipe(finalize(() =>
        //this.loading_btn = false
        console.log("getFormazioniByGionata new ")
      ))
      .subscribe({

        next: (result: any) => {
          console.log("getFormazioniByGionata new ",result)
        },
        error: (error: any) => {
          //this.alert.error(error);
          console.log(error)
        }
      })

  }


}
