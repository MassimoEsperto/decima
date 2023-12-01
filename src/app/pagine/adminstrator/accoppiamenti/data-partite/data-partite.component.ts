import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'data-partite',
  templateUrl: './data-partite.component.html',
  styleUrls: ['./data-partite.component.scss']
})
export class DataPartiteComponent implements OnInit {
  ngOnInit() {
    console.log("ngOnChanges")
  }


  @Input() accoppiamenti: any;
}
