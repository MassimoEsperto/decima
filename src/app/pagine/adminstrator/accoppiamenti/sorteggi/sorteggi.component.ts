import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SorteggiGironiComponent } from './sorteggi-gironi/sorteggi-gironi.component';
import { SorteggiEliminatorieComponent } from './sorteggi-eliminatorie/sorteggi-eliminatorie.component';

@Component({
  selector: 'sorteggi',
  standalone: true,
  imports: [
    CommonModule,
    SorteggiGironiComponent,
    SorteggiEliminatorieComponent
  ],
  templateUrl: './sorteggi.component.html',
  styleUrl: './sorteggi.component.scss'
})
export class SorteggiComponent {

  view: number = 0;

  onChangeSelect(event: any) {
    this.view = event.target.value
  }
}
