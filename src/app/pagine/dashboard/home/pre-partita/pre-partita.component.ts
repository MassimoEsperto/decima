import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { LanguageService } from 'src/servizi/local/language.service';


@Component({
  selector: 'pre-partita',
  standalone: true,
  imports: [
    MyButton,
    CommonModule
  ],
  templateUrl: './pre-partita.component.html',
  styleUrl: './pre-partita.component.scss'
})
export class PrePartitaComponent {

  @Input() dash: any;
 
  constructor(private router: Router,public language: LanguageService) {}

  inserisciFormazione() {
    this.router.navigate(['/dashboard/schieramento']);
  }

}
  

