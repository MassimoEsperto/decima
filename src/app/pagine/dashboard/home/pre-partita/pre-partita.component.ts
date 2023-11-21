import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/servizi/language.service';

@Component({
  selector: 'pre-partita',
  templateUrl: './pre-partita.component.html',
  styleUrls: ['./pre-partita.component.scss']
})
export class PrePartitaComponent {

  @Input() dash: any;

  
  constructor(private router: Router,public language: LanguageService) {}

  inserisciFormazione() {
    this.router.navigate(['/dashboard/schieramento']);
  }

}
  

