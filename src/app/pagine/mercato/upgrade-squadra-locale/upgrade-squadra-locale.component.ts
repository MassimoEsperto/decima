import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { Listino } from 'src/app/classi/calciatore';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { ViewIscirzione } from 'src/environments/enums';
import { AuthService } from 'src/servizi/client/auth.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';




@Component({
  selector: 'upgrade-squadra-locale',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule
  ],
  templateUrl: './upgrade-squadra-locale.component.html',
  styleUrl: './upgrade-squadra-locale.component.scss'
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
          console.log("listino",this.listino)

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
