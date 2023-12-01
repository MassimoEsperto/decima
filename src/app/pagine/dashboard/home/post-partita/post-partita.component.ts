import { Component, Input } from '@angular/core';
import { LanguageService } from 'src/app/servizi/language.service';

@Component({
  selector: 'post-partita',
  templateUrl: './post-partita.component.html',
  styleUrls: ['./post-partita.component.scss']
})
export class PostPartitaComponent {

  @Input() dash: any;

  constructor(public language: LanguageService) {}
  
}
