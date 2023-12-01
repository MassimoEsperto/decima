import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/servizi/language.service';

@Component({
  selector: 'frontespizio',
  templateUrl: './frontespizio.component.html',
  styleUrls: ['./frontespizio.component.scss']
})
export class FrontespizioComponent implements OnInit {

  animazione: boolean = true

  constructor(public language: LanguageService) { }

  ngOnInit() {
    this.changeAnimation()
  }

  changeAnimation() {
    setTimeout(() => {
      this.animazione = false
    }, 1500);
  }

}
