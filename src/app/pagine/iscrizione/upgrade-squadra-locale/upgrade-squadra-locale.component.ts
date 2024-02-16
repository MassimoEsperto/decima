import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'upgrade-squadra-locale',
  templateUrl: './upgrade-squadra-locale.component.html',
  styleUrls: ['./upgrade-squadra-locale.component.scss']
})
export class UpgradeSquadraLocaleComponent {

  @Output() change = new EventEmitter();
  @Input() id_squadra = 0;
  
  
}
