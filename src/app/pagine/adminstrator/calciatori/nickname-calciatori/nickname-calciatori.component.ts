import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'nickname-calciatori',
  standalone: true,
  imports: [
    MyButton,
    CommonModule,
    FormsModule
  ],
  templateUrl: './nickname-calciatori.component.html',
  styleUrl: './nickname-calciatori.component.scss'
})
export class NicknameCalciatoriComponent {

  @Input() lista_attuale: any;
  loading_btn: boolean = false

  constructor(
    private adminService: AdminService,
    public language: LanguageService,
    private alert: AlertService) {
  }

  onRinomina(payload: any) {

    this.loading_btn = true

    this.adminService.updCalciatore(payload)
      .pipe(finalize(() => {
        this.getAdministrator()
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  getAdministrator() {

    this.adminService.getAdministrator()
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.lista_attuale = result.lista_calciatori
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

}
