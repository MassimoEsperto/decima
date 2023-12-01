import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';

@Component({
  selector: 'calcolo-voti',
  templateUrl: './calcolo-voti.component.html',
  styleUrls: ['./calcolo-voti.component.scss']
})
export class CalcoloVotiComponent {

  @Input() calcolato: any;

  giornata_selezionata: string="";
  formazioni_inserite: any;
  risultati = [];
  voti_file: boolean = false

  loading_btn: boolean = false
  loading_page: boolean = false

  constructor(
    private alert: AlertService,
    public language: LanguageService,
    private adminService: AdminService) {
  }


  ngOnInit() {
    this.giornata_selezionata = this.calcolato.NO[0];
  }



  async importVoti(event: any) {
    let file: File
    let filelist: any = [];

    file = event.target.files[0];
    filelist = await this.adminService.getVotiFromFile(file)


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

      partite.CASA.goals = this.gol(partite.CASA.somma)
      partite.TRASFERTA.goals = this.gol(partite.TRASFERTA.somma)

      partite.CASA.punti = this.classifica(partite.CASA.goals, partite.TRASFERTA.goals)
      partite.TRASFERTA.punti = this.classifica(partite.TRASFERTA.goals, partite.CASA.goals)
    }

    this.voti_file = true
  }


  classifica(a: number, b: number) {
    if (a == b) return 1
    if (a > b) return 3
    else return 0
  }



  gol(punti: number) {

    if (punti < 30) {
      return 0
    } else {
      let tmp: any = (punti - 27) / 3;
      return parseInt(tmp).toFixed(0);
    }
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


