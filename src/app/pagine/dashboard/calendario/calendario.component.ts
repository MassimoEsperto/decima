import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { finalize } from 'rxjs';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { UtilService } from 'src/app/servizi/util.service';


@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  providers: [ UtilService ],
})
export class CalendarioComponent implements AfterViewInit {


  today: number = 1;

  calendario: any

  constructor(
    private playerService: PlayerService,
    private renderer: Renderer2,
    private el: ElementRef,
    private alert: AlertService,
    public language: LanguageService,
    public util: UtilService,
    public spinner: SpinnerService) {
  }

  ngOnInit(): void { this.getCalendario() }

  ngAfterViewInit() {

  }



  getCalendario() {

    this.spinner.view();

    this.playerService.getCalendario()
      .pipe(finalize(() => {
        this.spinner.clear()
        this.startSlide()
      }
      ))
      .subscribe({

        next: (result: any) => {

          this.today = result.findIndex((i: { active: boolean; }) => i.active == true);
          this.calendario = result

        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  startSlide() {

    let bottone = this.renderer.createElement('button');
    bottone.setAttribute('data-bs-target', '#carouselExample');
    bottone.setAttribute('data-bs-slide-to', this.today);
    bottone.setAttribute('hidden', 'true');
    this.renderer.appendChild(this.el.nativeElement, bottone);

    bottone.click()

  }


}
