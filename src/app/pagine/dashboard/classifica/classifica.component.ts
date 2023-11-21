import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';

@Component({
  selector: 'classifica',
  templateUrl: './classifica.component.html',
  styleUrls: ['./classifica.component.scss']
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

