import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SorteggiGironiComponent } from './sorteggi-gironi/sorteggi-gironi.component';
import { SorteggiEliminatorieComponent } from './sorteggi-eliminatorie/sorteggi-eliminatorie.component';
import { SorteggiGiornateComponent } from './sorteggi-giornate/sorteggi-giornate.component';
import { LOOKUPS } from 'src/app/classi/dto/lookup.dto';

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
  TIPO = LOOKUPS.SORTEGGI;

  onChangeSelect(event: any) {
    this.view = event.target.value
  }
}
