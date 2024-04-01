import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyNavbarUtente } from 'src/app/componenti/my-navbar-utente/my-navbar-utente.component';
import { MySpinner } from 'src/app/componenti/my-spinner/my-spinner.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    MySpinner,
    MyNavbarUtente
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



}
