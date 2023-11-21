import { Component } from '@angular/core';
import { LanguageService } from 'src/app/servizi/language.service';

@Component({
  selector: 'my-modal-albo',
  templateUrl: './my-modal-albo.component.html',
  styleUrls: ['./my-modal-albo.component.scss']
})
export class MyModalAlbo {

  constructor(public language: LanguageService) {}

  data = this.language.label.albo
  
}
