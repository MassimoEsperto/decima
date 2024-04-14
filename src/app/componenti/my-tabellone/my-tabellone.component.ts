import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/servizi/local/util.service';


@Component({
  selector: 'my-tabellone',
  templateUrl: './my-tabellone.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrl: './my-tabellone.component.scss',
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
    console.log(this.format)

  }

}