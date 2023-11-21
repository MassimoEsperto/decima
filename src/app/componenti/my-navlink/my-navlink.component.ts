import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'my-navlink',
  templateUrl: './my-navlink.component.html',
  styleUrls: ['./my-navlink.component.scss']
})
export class MyNavlink implements OnInit {

  @Output() myClick = new EventEmitter();

  @Input() isCollapse = false;
  @Input() link: string = "#";
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() isAdmin = false;


  constructor() { }

  ngOnInit(): void {
  }

  

}
