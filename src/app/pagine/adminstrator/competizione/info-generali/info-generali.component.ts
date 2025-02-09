import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, tap } from 'rxjs';
import { InfoGenerali } from 'src/app/classi/dto/info.generali.dto';
import { Lookup } from 'src/app/classi/dto/lookup.dto';
import { ShitCup } from 'src/app/classi/dto/shitcup.dto';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';


@Component({
  selector: 'info-generali',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule
  ],
  templateUrl: './info-generali.component.html',
  styleUrl: './info-generali.component.scss'
})
export class InfoGeneraliComponent implements OnInit {

  competizione!: InfoGenerali;
  lookup!: Lookup;
  loading_btn: boolean = false

  constructor(
    private adminService: AdminService,
    private alert: AlertService,
    public language: LanguageService
  ) { }


  ngOnInit(): void {
    this.getInfoGenerali()
  }

  getInfoGenerali() {

    this.adminService.getInfoGenerali()
      .subscribe({

        next: (result: ShitCup) => {
          this.competizione = new InfoGenerali(result.info)
          this.lookup = new Lookup(result.lookup)
          console.log("this.competizione",this.competizione)
          console.log("this.this.lookup",this.lookup)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  setInfoGenerali() {

    this.loading_btn = true

    this.adminService.setInfoGenerali(this.competizione)
      .pipe(
        finalize(() =>
          this.loading_btn = false
        ))
      .subscribe({

        next: (result: ShitCup) => {
          this.alert.success(this.language.label.alert.success);
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }


}
