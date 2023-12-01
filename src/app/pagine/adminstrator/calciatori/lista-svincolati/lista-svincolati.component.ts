import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Rosa } from 'src/app/classi/rosa';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';

@Component({
  selector: 'lista-svincolati',
  templateUrl: './lista-svincolati.component.html',
  styleUrls: ['./lista-svincolati.component.scss']
})
export class ListaSvincolatiComponent implements OnInit {

  @Input() lista_attuale: any;
  rose: Rosa[] = [];
  loading_btn: boolean = false

  constructor(
    private adminService: AdminService,
    public language: LanguageService,
    private alert: AlertService) {
  }

  ngOnInit() { }


  async importListaCalciatori(event: any) {

    let file: File
    file = event.target.files[0];

    this.rose = await this.adminService.getSvincolatiFromFile(file, this.lista_attuale)

  }


  onAggiungiCalciatori() {

    console.log("aggiungiCalciatori ")
  }


  aggiungiCalciatori() {

    this.loading_btn = true;

    this.adminService.insertSvincolati(this.rose)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }
      ))
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
