import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FantaGazzettaService } from 'src/app/servizi/fanta-gazzetta.service';
import { LanguageService } from 'src/app/servizi/language.service';

@Component({
  selector: 'partita-incorso',
  templateUrl: './partita-incorso.component.html',
  styleUrls: ['./partita-incorso.component.scss']
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