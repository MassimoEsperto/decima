import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { Listino } from 'src/app/classi/calciatore';
import { AlertService } from 'src/app/servizi/alert.service';
import { AuthService } from 'src/app/servizi/auth.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { ViewIscirzione } from 'src/environments/enums';


@Component({
  selector: 'upgrade-squadra-locale',
  templateUrl: './upgrade-squadra-locale.component.html',
  styleUrls: ['./upgrade-squadra-locale.component.scss']
})
export class UpgradeSquadraLocaleComponent implements OnInit {

  @Output() change = new EventEmitter();
  @Input() id_squadra = 0;

  loading_btn: boolean = false;
  stepform = 1
  listino: Listino = new Listino();


  constructor(
    private authService: AuthService,
    public language: LanguageService,
    public spinner: SpinnerService,
    private alert: AlertService) {
  }


  ngOnInit(): void {
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

svincolaCalciatori(){

 this.listino.svincola()
  
  this.passaggioSuccessivo()
}


  passaggioSuccessivo() {
    this.stepform += 1
  }

  confermaSquadra() {

      let payload: any = {
        id_squadra: this.id_squadra,
        squadra: this.listino.squadra,
        players: this.listino.selezionati
      }

      this.updComponiSquadra(payload)
    
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

  

}
