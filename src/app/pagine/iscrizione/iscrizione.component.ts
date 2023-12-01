import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'iscrizione',
  templateUrl: './iscrizione.component.html',
  styleUrls: ['./iscrizione.component.scss']
})
export class IscrizioneComponent {

  constructor(
    private router: Router) {
  }

  registra: boolean = false

  goBack() {
    this.router.navigate(['login']);
  }

  revert(event: any) {
    if (event == 'cambio') {
      this.registra = !this.registra
    }
  }

}
