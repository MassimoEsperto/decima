import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { ExcelService } from 'src/servizi/local/excel.service';
import { Calciatore, Roster } from 'src/app/classi/calciatore';

@Component({
  selector: 'lista-svincolati',
  standalone: true,
  imports: [MyButton],
  templateUrl: './lista-svincolati.component.html',
  styleUrl: './lista-svincolati.component.scss'
})
export class ListaSvincolatiComponent implements OnInit {

  @Input() lista_attuale: any;
  roster!: Roster;
  loading_btn: boolean = false

  constructor(
    private adminService: AdminService,
    public language: LanguageService,
    private excelService: ExcelService,
    private alert: AlertService) {
  }

  ngOnInit() { }


  async importListaCalciatori(event: any) {

    let file: File
    file = event.target.files[0];

    this.roster = await this.excelService.getSvincolatiFromFile(file, this.lista_attuale)
console.log("this.roster",this.roster)
  }


  onAggiungiCalciatori() {
    this.aggiungiCalciatori(this.roster)
  }


  aggiungiCalciatori(payload: any) {

    this.loading_btn = true;

    this.adminService.insertSvincolati(payload)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }
      ))
      .subscribe({
        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          this.adminService.refreshPage()
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })
  }




}
