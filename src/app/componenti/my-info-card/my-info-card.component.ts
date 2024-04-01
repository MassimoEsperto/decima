import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-info-card',
  templateUrl: './my-info-card.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './my-info-card.component.scss'
})


export class MyInfoCard {

  @Input() info: any;
  
  toast: boolean = false

  tempo: string = new Date().getHours() + ":" + new Date().getMinutes()

  constructor() { }

}
