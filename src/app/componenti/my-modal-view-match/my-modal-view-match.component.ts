import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/classi/match';
import { PlayerService } from 'src/app/servizi/player.service';
import { ViewMatchService } from 'src/app/servizi/view-match.service';

@Component({
  selector: 'my-modal-view-match',
  templateUrl: './my-modal-view-match.component.html',
  styleUrls: ['./my-modal-view-match.component.scss']
})
export class MyModalViewMatch implements OnInit {
  private subscription: Subscription = new Subscription;

  match: Match = new Match();

  constructor(
    private view: ViewMatchService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): any {

    this.subscription = this.view.getMatch().subscribe((match: any) => {
      let partita = match.data.record;
      if (partita) {
        this.viewMatch(partita)
      }
    });
  }

  viewMatch(partita: any) {

    this.playerService.viewMatch(partita)
      .subscribe({

        next: (result: any) => {
          this.match = result;
        },
        error: (error: any) => {
        }
      })

  }

  ngOnDestroy() {
    document.body.removeAttribute("style");
  }

}  
