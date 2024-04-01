import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/servizi/local/language.service';


@Component({
  selector: 'frontespizio',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './frontespizio.component.html',
  styleUrl: './frontespizio.component.scss'
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
