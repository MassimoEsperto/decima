import { Component, Input, OnInit } from '@angular/core';
import { ViewMatchService } from 'src/app/servizi/view-match.service';

@Component({
  selector: 'my-risultati',
  templateUrl: './my-risultati.component.html',
  styleUrls: ['./my-risultati.component.scss']
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
