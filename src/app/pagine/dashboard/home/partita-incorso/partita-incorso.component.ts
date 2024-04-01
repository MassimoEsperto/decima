import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { FantaGazzettaService } from 'src/servizi/client/fanta-gazzetta.service';
import { LanguageService } from 'src/servizi/local/language.service';


@Component({
  selector: 'partita-incorso',
  standalone: true,
  imports: [
    MyButton,
    CommonModule
  ],
  templateUrl: './partita-incorso.component.html',
  styleUrl: './partita-incorso.component.scss'
})
export class PartitaIncorsoComponent {

  @Input() dash: any;

  constructor(private router: Router,
    public language: LanguageService,
    private fantaService: FantaGazzettaService) {}

  votilive: any

  ngOnInit(){
    this.getLivefanta()
  }

  getLivefanta() {

    this.fantaService.getLiveFormazione()

      .subscribe({

        next: (result: any) => {
          this.votilive = result;
        }
      })

  }

  visualizzaLive() {
    this.router.navigate(['/dashboard/voti-live']);
  }

}