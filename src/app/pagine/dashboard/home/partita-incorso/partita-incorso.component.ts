import { Component, Input } from '@angular/core';

@Component({
  selector: 'partita-incorso',
  templateUrl: './partita-incorso.component.html',
  styleUrls: ['./partita-incorso.component.scss']
})
export class PartitaIncorsoComponent {

  @Input() dash: any;
  
}
