import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';

@Component({
  selector: 'my-navbar-admin',
  templateUrl: './my-navbar-admin.component.html',
  styleUrls: ['./my-navbar-admin.component.scss']
})
export class MyNavbarAdmin implements OnInit {

  constructor(private route: ActivatedRoute,
    private elementRef: ElementRef,
    private player: PlayerService,
    public language: LanguageService) { }

  ngOnInit(): void {
  }

  isCollapse: boolean = false
  play_comp: boolean = true


}