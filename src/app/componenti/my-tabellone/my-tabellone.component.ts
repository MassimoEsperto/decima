import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/app/servizi/util.service';
import { FasiCompetizione } from 'src/environments/enums';

@Component({
  selector: 'my-tabellone',
  templateUrl: './my-tabellone.component.html',
  styleUrls: ['./my-tabellone.component.scss'],
  providers: [UtilService]
})
export class MyTabellone implements OnInit {

  @Input() tabellone: any;
 
  format: any


  constructor(
    private util: UtilService
  ) { }

  ngOnInit(): void {

    this.format = this.util.formatTabellone(this.tabellone)
    console.log("this.format",this.format)

  }

}