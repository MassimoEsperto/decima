import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { Utente } from 'src/app/classi/utente';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExcelService } from 'src/servizi/local/excel.service';

@Component({
  selector: 'carica-squadre',
  standalone: true,
  imports: [
    MyButton,
    CommonModule,
    FormsModule
  ],
  templateUrl: './carica-squadre.component.html',
  styleUrl: './carica-squadre.component.scss'
})
export class CaricaSquadreComponent {

  @Input() utenti: Utente[] = [];
  @Input() listaRose: any;

  constructor(
    private adminService: AdminService,
    private excelService: ExcelService,
    public language: LanguageService,
    private alert: AlertService) {
  }

  formazioni: any = [];
  lega: string = ""
  loading_btn: boolean = false

  ngOnInit() { }


  clean(payload: any) {

    this.loading_btn = true;

    this.adminService.deleteRosa(payload.id_utente)
      .subscribe({
        next: (result: any) => {
          this.associaCalciatori(payload);
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })
  }

  associaCalciatori(payload: any) {

    this.adminService.insertRosaUtente(payload)
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


  async importSquadre(event: any) {

    let file: File
    file = event.target.files[0];

    let filelist = await this.excelService.getSquadreFromFile(file, this.listaRose);

    if (filelist.inesistente) {
      this.alert.error(filelist.inesistente);
    } else {
      this.formazioni = filelist.formazioni
      this.lega = filelist.lega
    }


  }

  onAssocia(element:any) {

    let payload = {
      id_utente: element.utente.id,
      lista: element.squadra.squadra,
      lega: this.lega
    }

    this.clean(payload);
    
  }

}

