import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { SUB_PAGE_ADMIN } from 'src/environments/environment';

@Component({
  selector: 'accoppiamenti',
  templateUrl: './accoppiamenti.component.html',
  styleUrls: ['./accoppiamenti.component.scss']
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
