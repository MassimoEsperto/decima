import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { MyTitolo } from 'src/app/componenti/my-titolo/my-titolo.component';
import { PlayerService } from 'src/servizi/client/player.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';


@Component({
  selector: 'squadre',
  standalone: true,
  imports: [
    MyTitolo,
    CommonModule
  ],
  templateUrl: './squadre.component.html',
  styleUrl: './squadre.component.scss'
})
export class SquadreComponent implements AfterViewInit,OnInit {

  rose: any;

  constructor(
    private playerService: PlayerService,
    private alert: AlertService,
    public language: LanguageService,
    public spinner: SpinnerService) {
  }
  ngOnInit(): void {
    this.spinner.view();
  }
  ngAfterViewInit(): void {
    this.getSquadre();
  }

  

  getSquadre() {

    this.playerService.getListaRose()
      .pipe(finalize(() =>
        this.spinner.clear()
      ))
      .subscribe({

        next: (result: any) => {
          this.rose = result
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

}

