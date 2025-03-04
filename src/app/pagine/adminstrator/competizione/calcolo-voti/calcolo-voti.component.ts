import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExcelService } from 'src/servizi/local/excel.service';
import { UtilService } from 'src/servizi/local/util.service';
import { PayloadCalcolo, Risultato } from 'src/app/classi/dto/risultato.dto';
import { FantaGazzettaService } from 'src/servizi/client/fanta-gazzetta.service';

@Component({
  selector: 'calcolo-voti',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule
  ],
  templateUrl: './calcolo-voti.component.html',
  styleUrl: './calcolo-voti.component.scss'
})
export class CalcoloVotiComponent {

  @Input() calcolato: any;

  giornata_selezionata!: number;
  formazioni_inserite: Risultato[] = [];
  risultati = [];
  voti_file: boolean = false
  calcolo!: PayloadCalcolo;

  loading_btn: boolean = false
  loading_page: boolean = false

  constructor(
    private alert: AlertService,
    public language: LanguageService,
    private excelService: ExcelService,
    private adminService: AdminService,
    private utilService: UtilService,
    private fantaService: FantaGazzettaService,
  ) {
  }


  ngOnInit() {
    this.giornata_selezionata = this.calcolato.NO[0];
  }



  async importVoti(event: any) {
    let file: File
    let filelist: any = [];

    file = event.target.files[0];
    filelist = await this.excelService.getVotiFromFile(file)

    this.calcolo = this.utilService.getCalcolo(
      this.formazioni_inserite, filelist,
      this.calcolato.TURNO,
      this.giornata_selezionata
    );

    this.voti_file = true
  }


  /* CHIAMATA AI SERVIZI */
  formazioniByGionata() {
    this.loading_btn = true;
    this.loading_page = false;

    this.adminService.getFormazioniByGionata(this.giornata_selezionata)
      .pipe(finalize(() => {
        this.loading_btn = false;
        this.loading_page = true;
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.formazioni_inserite = result
          this.votiByGionata()
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  votiByGionata() {
    this.loading_btn = true;
    this.loading_page = false;

    this.fantaService.getVotiGionata(this.giornata_selezionata)
      .pipe(finalize(() => {
        this.loading_btn = false;
        this.loading_page = true;
      }
      ))
      .subscribe({

        next: (result: any) => {

          this.calcolo = this.utilService.getCalcolo(
            this.formazioni_inserite, result,
            this.calcolato.TURNO,
            this.giornata_selezionata
          );

          this.voti_file = true
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  onCalcolaGiornata() {
    this.loading_btn = true;
    let payload = this.calcolo
    this.calcolaGiornata(payload)
  }


  calcolaGiornata(payload: any) {

    this.adminService.calcolaGiornata(payload)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          // this.adminService.refreshPage();
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

}


