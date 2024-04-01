import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/servizi/local/language.service';

@Component({
  selector: 'my-modal-language',
  templateUrl: './my-modal-language.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrl: './my-modal-language.component.scss'
})
export class MyModalLanguage implements OnInit {

  constructor(public language: LanguageService) { }
  ngOnInit(): void {

  }

  data = {
    titolo: this.language.label.modali.cambia_lingua,
    lista: this.language.label.modali.lingue
  }

  selected: string = ""

  onSelected(item: any) {
    this.selected = item.cod
  }

  onChangeLanguage() {
    if (this.selected)
      this.language.setLinguaggio(this.selected)

  }


}
