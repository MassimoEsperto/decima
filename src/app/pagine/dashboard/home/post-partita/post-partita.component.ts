import { Component, Input } from '@angular/core';
import { MyRisultati } from 'src/app/componenti/my-risultati/my-risultati.component';
import { LanguageService } from 'src/servizi/local/language.service';


@Component({
  selector: 'post-partita',
  standalone: true,
  imports: [
    MyRisultati
  ],
  templateUrl: './post-partita.component.html',
  styleUrl: './post-partita.component.scss'
})
export class PostPartitaComponent {

  @Input() dash: any;

  constructor(public language: LanguageService) {}
  
}
