import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { Listino } from 'src/app/classi/calciatore';
import { Squadra } from 'src/app/classi/squadra';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { ViewIscirzione } from 'src/environments/enums';
import { AuthService } from 'src/servizi/client/auth.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';


@Component({
  selector: 'componi-squadra',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule
  ],
  templateUrl: './componi-squadra.component.html',
  styleUrl: './componi-squadra.component.scss'
})
export class ComponiSquadraComponent implements OnInit {

  @Output() change = new EventEmitter();
  @Input() id_squadra = 0;

  loading_btn: boolean = false;
  squadre: Squadra[] = [];
  stepform = 1
  listino: Listino = new Listino();


  constructor(
    private authService: AuthService,
    public language: LanguageService,
    public spinner: SpinnerService,
    private alert: AlertService) {
  }


  ngOnInit(): void {
    console.log("id_squadra", this.id_squadra)
    this.getComponiSquadra()
  }

  getComponiSquadra() {

    this.spinner.view();

    this.authService.getComponiSquadra(this.id_squadra)
      .pipe(finalize(() => {
        this.spinner.clear()
      }))
      .subscribe({
        next: (result: any) => {

          this.listino = new Listino(result)

        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }

  esci() {
    this.change.emit(ViewIscirzione.LISTA)
  }




  onRegistraSquadra() {
    console.log("this.squadre", this.squadre)
    let esiste: boolean = this.squadre.some(x => x.squadra == this.listino.squadra);
    if (esiste) {
      this.alert.error("Nome squadra già esistente");
    } else {
      this.passaggioSuccessivo()
    }
  }

  passaggioSuccessivo() {
    this.stepform += 1
  }

  confermaSquadra() {

    if (this.id_squadra == 0) {

      let payload: any = {
        squadra: this.listino.squadra,
        players: this.listino.selezionati
      }

      this.registraSquadra(payload)

    } else {

      let payload: any = {
        id_squadra: this.id_squadra,
        squadra: this.listino.squadra,
        players: this.listino.selezionati
      }

      this.updComponiSquadra(payload)
    }
  }



  updComponiSquadra(payload: any) {

    this.loading_btn = true;

    this.authService.updComponiSquadra(payload)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          this.esci()
        },
        error: (error: any) => {
          this.alert.error(error);
        },
      })
  }

  registraSquadra(payload: any) {

    this.loading_btn = true;

    this.authService.setComponiSquadra(payload)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          this.esci()
        },
        error: (error: any) => {
          this.alert.error(error);
        },
      })
  }

}
