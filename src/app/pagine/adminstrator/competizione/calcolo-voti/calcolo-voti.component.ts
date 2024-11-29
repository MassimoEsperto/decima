import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExcelService } from 'src/servizi/local/excel.service';

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

  giornata_selezionata: string = "";
  formazioni_inserite: any;
  risultati = [];
  voti_file: boolean = false

  loading_btn: boolean = false
  loading_page: boolean = false

  constructor(
    private alert: AlertService,
    public language: LanguageService,
    private excelService: ExcelService,
    private adminService: AdminService) {
  }


  ngOnInit() {
    this.giornata_selezionata = this.calcolato.NO[0];
  }



  async importVoti(event: any) {
    let file: File
    let filelist: any = [];

    file = event.target.files[0];
    filelist = await this.excelService.getVotiFromFile(file)


    for (let partite of this.formazioni_inserite) {
      partite.CASA.somma = Number(partite.CASA.bonus)
      partite.TRASFERTA.somma = Number(partite.TRASFERTA.bonus)

      for (let casa of partite.CASA.schieramento) {
        casa.voto = Number(filelist[casa.calciatore]) || 4
        partite.CASA.somma += casa.voto;
      }

      for (let trasferta of partite.TRASFERTA.schieramento) {
        trasferta.voto = Number(filelist[trasferta.calciatore]) || 4
        partite.TRASFERTA.somma += trasferta.voto;
      }

      partite.CASA.goals = this.goals(partite.CASA.somma)
      partite.TRASFERTA.goals = this.goals(partite.TRASFERTA.somma)

      partite.CASA.punti = this.punti(partite.CASA.goals, partite.TRASFERTA.goals)
      partite.TRASFERTA.punti = this.punti(partite.TRASFERTA.goals, partite.CASA.goals)

      partite.CASA.rank = this.rank(partite.CASA.goals, partite.CASA.punti)
      partite.TRASFERTA.rank = this.rank(partite.TRASFERTA.goals, partite.TRASFERTA.punti)
    }

    this.voti_file = true
  }


  punti(a: number, b: number) {
    if (a == b) return 1
    if (a > b) return 3
    else return 0
  }

  goals(somma: number) {

    if (somma < 30) {
      return 0
    } else {
      let tmp: any = (somma - 27) / 3;
      return parseInt(tmp).toFixed(0);
    }
  }

  rank(goals: number, punti: number): number {
    return (goals * 2 * this.calcolato.FASE) + punti
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
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  onCalcolaGiornata() {

    let payload = {
      giornata: this.giornata_selezionata,
      risultati: this.formazioni_inserite
    }

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
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

}


