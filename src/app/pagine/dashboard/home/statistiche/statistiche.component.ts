import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LOOKUPS } from 'src/app/classi/dto/lookup.dto';
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
export class StatisticheComponent {

  @Input() statistiche: any;
  @Input() percorso: any;
  loading_btn: boolean = false;
  loading_page: boolean = false;
  loading_table: boolean = false;

  constructor(public language: LanguageService) {
  }

  ngOnInit() { }


  getStato(num: string) {

    switch (Number(num)) {
      case LOOKUPS.STATI.ELIMINATA:
        return this.language.label.page.stati.eliminato
      case LOOKUPS.STATI.VINCITRICE:
        return this.language.label.page.stati.vincitore
      default:
        return this.language.label.page.stati.in_corsa
    }


  }


}

