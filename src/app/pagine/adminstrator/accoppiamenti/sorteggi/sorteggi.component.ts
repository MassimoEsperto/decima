import { Component } from '@angular/core';

@Component({
  selector: 'sorteggi',
  templateUrl: './sorteggi.component.html',
  styleUrls: ['./sorteggi.component.scss']
})
export class SorteggiComponent {

  view: number = 0;

  onChangeSelect(event: any) {
    this.view = event.target.value
  }
}
