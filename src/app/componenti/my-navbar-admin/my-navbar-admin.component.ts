import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/servizi/client/player.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { MyNavlink } from 'src/app/componenti/my-navlink/my-navlink.component';
import { CommonModule } from '@angular/common';
import { MyFooter } from '../my-footer/my-footer.component';
import { PAGE } from 'src/environments/costanti';

@Component({
  selector: 'my-navbar-admin',
  templateUrl: './my-navbar-admin.component.html',
  standalone: true,
  imports: [
    MyNavlink,
    CommonModule,
    MyFooter
  ],
  styleUrl: './my-navbar-admin.component.scss'
})
export class MyNavbarAdmin {

  constructor(private route: ActivatedRoute,
    private elementRef: ElementRef,
    private player: PlayerService,
    public language: LanguageService) { }

  PAGE = PAGE
  isCollapse: boolean = false
  play_comp: boolean = true


}