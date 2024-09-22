import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { LOGIN_PAGE } from 'src/environments/costanti';
import { AuthService } from 'src/servizi/client/auth.service';
import { AlertService } from 'src/servizi/local/alert.service';


@Component({
  selector: 'rec-pass',
  standalone: true,
  imports: [
    MyButton,
    CommonModule,
    FormsModule
  ],
  templateUrl: './rec-pass.component.html',
  styleUrl: './rec-pass.component.scss'
})
export class RecPassComponent implements OnInit {

  @Output() submitto = new EventEmitter();
  @Input() combo: any;
  loading_btn: boolean = false
  LOGIN_PAGE = LOGIN_PAGE


  constructor(
    private alert: AlertService,
    private auth: AuthService) {
  }

  ngOnInit(): void { }

  onRecPass(item: any) {

    this.loading_btn = true

    this.auth.recuperaPassword(item.utente)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success("A breve riceverai una email con la tua password");
          this.submitto.emit(LOGIN_PAGE.SIGN_IN)

        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

}

