import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-info-card',
  templateUrl: './my-info-card.component.html',
  styleUrls: ['./my-info-card.component.scss']
})


export class MyInfoCard {

  @Input() info: any;
  
  toast: boolean = false

  tempo: string = new Date().getHours() + ":" + new Date().getMinutes()

  constructor() { }

}
