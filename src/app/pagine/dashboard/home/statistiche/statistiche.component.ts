import { Component, Input } from '@angular/core';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { LanguageService } from 'src/app/servizi/language.service';

@Component({
  selector: 'statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.scss']
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

