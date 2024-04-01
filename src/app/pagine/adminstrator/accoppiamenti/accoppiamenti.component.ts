import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { MyInfoCard } from 'src/app/componenti/my-info-card/my-info-card.component';
import { SUB_PAGE_ADMIN } from 'src/environments/costanti';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';
import { SorteggiComponent } from './sorteggi/sorteggi.component';
import { DataGiornateComponent } from './data-giornate/data-giornate.component';
import { PartiteComponent } from './partite/partite.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'accoppiamenti',
  standalone: true,
  imports: [
    MyInfoCard,
    SorteggiComponent,
    DataGiornateComponent,
    PartiteComponent,
    CommonModule
  ],
  templateUrl: './accoppiamenti.component.html',
  styleUrl: './accoppiamenti.component.scss'
})
export class AccoppiamentiComponent implements OnInit {

  accoppiamenti: any

  info = {
    titolo: "CALENDARIO",
    desc: "IN QUESTA SEZIONE E' POSSIBILE GESTIRE IL CALENDARIO"
  }
  
  PAGE = SUB_PAGE_ADMIN


  constructor(
    private adminService: AdminService,
    private alert: AlertService,
    public spinner: SpinnerService
  ) { }

  ngOnInit() {
    this.getAccoppiamenti()
  }


  getAccoppiamenti() {

    this.accoppiamenti = '';

    this.spinner.view();

    this.adminService.getAccoppiamenti()
      .pipe(finalize(() =>
        this.spinner.clear()
      ))
      .subscribe({

        next: (result: any) => {
          this.accoppiamenti = result
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }


}
