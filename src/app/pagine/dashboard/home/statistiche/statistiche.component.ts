import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { LanguageService } from 'src/servizi/local/language.service';


@Component({
  selector: 'statistiche',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './statistiche.component.html',
  styleUrl: './statistiche.component.scss'
})
export class StatisticheComponent extends OnInitComp {

  @Input() statistiche: any;
  @Input() percorso: any;

  constructor(public language: LanguageService) {
    super();
  }

  ngOnInit() { }


  getStato(num: string) {

    switch (Number(num)) {
      case this.STATI_SQUADRA.ELIMINATO:
        return this.language.label.page.stati.eliminato
      case this.STATI_SQUADRA.VINCITORE:
        return this.language.label.page.stati.vincitore
      default:
        return this.language.label.page.stati.in_corsa
    }


  }


}

