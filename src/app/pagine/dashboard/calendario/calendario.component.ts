import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';


@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent extends OnInitComp implements AfterViewInit {


  today: number = 1;

  calendario: any

  constructor(
    private playerService: PlayerService,
    private renderer: Renderer2,
    private el: ElementRef,
    private alert: AlertService,
    public language: LanguageService,
    public spinner: SpinnerService) {
    super();
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


  getFasi(num: number) {

    switch (Number(num)) {
      case this.FASE_COMPETIZIONE.GIRONI:
        return this.language.label.page.fasi.gironi
      case this.FASE_COMPETIZIONE.SPAREGGI:
        return this.language.label.page.fasi.spareggi
      case this.FASE_COMPETIZIONE.OTTAVI:
        return this.language.label.page.fasi.ottavi
      case this.FASE_COMPETIZIONE.QUARTI:
        return this.language.label.page.fasi.quarti
      case this.FASE_COMPETIZIONE.SEMI_FINALE:
        return this.language.label.page.fasi.semi_finale
      case this.FASE_COMPETIZIONE.FINALE:
        return this.language.label.page.fasi.finale
      default: return ""
    }


  }

}
