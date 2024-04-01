import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ViewMatchService } from 'src/servizi/local/view-match.service';

@Component({
  selector: 'my-risultati',
  templateUrl: './my-risultati.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrl: './my-risultati.component.scss'
})
export class MyRisultati implements OnInit {
 
  constructor(private view: ViewMatchService) { }  

  @Input() calendario: any;

  ngOnInit(): void {}

  ngOnChanges() {}

  viewMatch(record:any){
    this.view.setMatch({record})
  }

}
