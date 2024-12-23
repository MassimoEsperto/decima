import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SorteggiGironiComponent } from './sorteggi-gironi/sorteggi-gironi.component';
import { SorteggiEliminatorieComponent } from './sorteggi-eliminatorie/sorteggi-eliminatorie.component';
import { TipoSorteggi } from 'src/environments/enums';
import { SorteggiGiornateComponent } from './sorteggi-giornate/sorteggi-giornate.component';

@Component({
  selector: 'sorteggi',
  standalone: true,
  imports: [
    CommonModule,
    SorteggiGironiComponent,
    SorteggiEliminatorieComponent,
    SorteggiGiornateComponent
  ],
  templateUrl: './sorteggi.component.html',
  styleUrl: './sorteggi.component.scss'
})
export class SorteggiComponent {

  view: number = 0;
  TIPO = TipoSorteggi;

  onChangeSelect(event: any) {
    this.view = event.target.value
  }
}
