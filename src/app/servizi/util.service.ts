import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { LanguageService } from './language.service';
import { FasiCompetizione } from 'src/environments/enums';
import { BOLEANO } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private language: LanguageService) { }

  FASE_COMPETIZIONE = FasiCompetizione;


  clodeModal() {

    let div = this.renderer.createElement('div');
    div.setAttribute('data-bs-dismiss', 'modal');
    div.setAttribute('hidden', 'true');
    this.renderer.appendChild(this.el.nativeElement, div);
    div.click();
    this.renderer.removeChild(this.el.nativeElement, div);

  }

  getFasi(input: number) {

    switch (Number(input)) {
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

  getBoleano(input: string) {

    switch (input) {
      case BOLEANO[0].valore:
        return BOLEANO[0].descrizione
      case BOLEANO[1].valore:
        return BOLEANO[1].descrizione
      default: return BOLEANO[1].descrizione
    }


  }

}
