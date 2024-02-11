import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { Calciatore, Listone } from 'src/app/classi/calciatore';
import { AlertService } from 'src/app/servizi/alert.service';
import { AuthService } from 'src/app/servizi/auth.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { ViewIscirzione } from 'src/environments/enums';

@Component({
  selector: 'crea-squadra',
  templateUrl: './crea-squadra.component.html',
  styleUrls: ['./crea-squadra.component.scss']
})
export class CreaSquadraComponent implements OnInit {

  @Output() change = new EventEmitter();

  loading_btn: boolean = false;
  calciatori: Listone = new Listone();
  stepform = 1

  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    public language: LanguageService,
    public spinner: SpinnerService,
    private alert: AlertService) {
  }


  ngOnInit(): void {
    this.getCreaSquadra()
  }

  getCreaSquadra() {

    this.spinner.view();

    this.authService.getCreaSquadra()
      .pipe(finalize(() => {
        this.spinner.clear()
      }))
      .subscribe({
        next: (result: any) => {
          this.calciatori.ini(result.listone);
          this.calciatori.residui = result.crediti

          console.log("this.calciatori ", this.calciatori)

        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  esci() {
    this.change.emit(ViewIscirzione.LISTA)
  }

  selected(ruolo: string) {

    switch (ruolo) {
      case "P":
        return this.calciatori.portieri.filter((e: { selected: boolean; }) => e.selected === true);

      case "D":
        return this.calciatori.difensori.filter((e: { selected: boolean; }) => e.selected === true);

      case "C":
        return this.calciatori.centrocampisti.filter((e: { selected: boolean; }) => e.selected === true);

      case "A":
        return this.calciatori.attaccanti.filter((e: { selected: boolean; }) => e.selected === true);

      default:
        return [];
    }

  }

  passaggioSuccessivo() {
    this.stepform += 1
  }

  confermaSquadra(){
    console.log("calciatori.selezionati",this.calciatori.selezionati)
  }

}
