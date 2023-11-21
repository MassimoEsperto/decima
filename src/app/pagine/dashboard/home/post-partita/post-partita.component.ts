import { Component, Input } from '@angular/core';

@Component({
  selector: 'post-partita',
  templateUrl: './post-partita.component.html',
  styleUrls: ['./post-partita.component.scss']
})
export class PostPartitaComponent {

  @Input() dash: any;
  
}
