import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyNavbarAdmin } from 'src/app/componenti/my-navbar-admin/my-navbar-admin.component';
import { MySpinner } from 'src/app/componenti/my-spinner/my-spinner.component';

@Component({
  selector: 'adminstrator',
  standalone: true,
  imports: [
    RouterOutlet,
    MySpinner,
    MyNavbarAdmin
  ],
  templateUrl: './adminstrator.component.html',
  styleUrl: './adminstrator.component.scss'
})
export class AdminstratorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
