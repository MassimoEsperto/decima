import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';

@Component({
  selector: 'my-navbar-utente',
  templateUrl: './my-navbar-utente.component.html',
  styleUrls: ['./my-navbar-utente.component.scss']
})
export class MyNavbarUtente implements OnInit {


  constructor(private route: ActivatedRoute,
    private elementRef: ElementRef,
    private player: PlayerService,
    public language: LanguageService) { }

  ngOnInit(): void {
  }

  isCollapse: boolean = false


}