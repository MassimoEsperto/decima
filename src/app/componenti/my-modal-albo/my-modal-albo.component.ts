import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from 'src/servizi/local/language.service';

@Component({
  selector: 'my-modal-albo',
  templateUrl: './my-modal-albo.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrl: './my-modal-albo.component.scss'
})
export class MyModalAlbo {

  constructor(public language: LanguageService) {}

  data = this.language.label.albo
  
}
