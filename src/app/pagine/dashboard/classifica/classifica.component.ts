import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { MyTabellone } from 'src/app/componenti/my-tabellone/my-tabellone.component';
import { MyTitolo } from 'src/app/componenti/my-titolo/my-titolo.component';
import { PlayerService } from 'src/servizi/client/player.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';



@Component({
  selector: 'classifica',
  standalone: true,
  imports: [
    CommonModule,
    MyTitolo,
    MyTabellone
  ],
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.scss'
})
export class ClassificaComponent extends OnInitComp implements OnInit {

  classifiche: any;

  headElementsGironi = [this.language.label.page['squadra'], 'GOL', 'PT'];
  headElementsFactory = [this.language.label.page['squadra'], 'CM'];


  constructor(
    private playerService: PlayerService,
    private alert: AlertService,
    public language: LanguageService,
    public spinner: SpinnerService) {
    super();
  }


  ngOnInit(): void { this.getClassifiche() }


  getClassifiche() {

    this.spinner.view();

    this.playerService.getClassifiche()
      .pipe(finalize(() =>
        this.spinner.clear()
      ))
      .subscribe({

        next: (result: any) => {
          this.classifiche = result
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }



}

