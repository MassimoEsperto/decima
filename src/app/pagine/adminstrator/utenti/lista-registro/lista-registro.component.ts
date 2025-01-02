import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lista-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-registro.component.html',
  styleUrl: './lista-registro.component.scss'
})
export class ListaRegistroComponent {

  @Input() squadre: any;
  @Output() update:EventEmitter<any> = new EventEmitter<any>();
  @Output() delete = new EventEmitter();


}
