import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/servizi/client/player.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { MyNavlink } from 'src/app/componenti/my-navlink/my-navlink.component';
import { CommonModule } from '@angular/common';
import { MyFooter } from '../my-footer/my-footer.component';
import { PAGE } from 'src/environments/costanti';


@Component({
  selector: 'my-navbar-utente',
  templateUrl: './my-navbar-utente.component.html',
  standalone: true,
  imports: [
    MyNavlink,
    CommonModule,
    MyFooter
  ],
  styleUrl: './my-navbar-utente.component.scss'
})
export class MyNavbarUtente {

  PAGE = PAGE

  constructor(private route: ActivatedRoute,
    private elementRef: ElementRef,
    private player: PlayerService,
    public language: LanguageService) { }

  isCollapse: boolean = false


}