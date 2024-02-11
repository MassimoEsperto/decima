import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewIscirzione } from 'src/environments/enums';

@Component({
  selector: 'iscrizione',
  templateUrl: './iscrizione.component.html',
  styleUrls: ['./iscrizione.component.scss']
})
export class IscrizioneComponent {

  constructor(
    private router: Router) {
  }

  VIEW_ISCRIZIONE = ViewIscirzione;
  view: number = ViewIscirzione.LISTA

  goBack() {
    this.router.navigate(['login']);
  }

  changeView(event: any) {
    this.view = !isNaN(event) ? event : this.view
  }


}
