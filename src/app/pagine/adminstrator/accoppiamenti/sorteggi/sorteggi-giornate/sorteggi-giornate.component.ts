import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, map, startWith } from 'rxjs';
import { Giornata } from 'src/app/classi/dto/giornata.dto';
import { Lookup } from 'src/app/classi/dto/lookup.dto';
import { ShitCup } from 'src/app/classi/dto/shitcup.dto';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { AdminService } from 'src/servizi/client/admin.service';
import { AuthService } from 'src/servizi/client/auth.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { UtilService } from 'src/servizi/local/util.service';

@Component({
  selector: 'sorteggi-giornate',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sorteggi-giornate.component.html',
  styleUrl: './sorteggi-giornate.component.scss',
  providers: [UtilService],
})
export class SorteggiGiornateComponent extends OnInitComp implements OnInit {

  giornate: Giornata[] = [];
  lookups!: Lookup;

  // Crea un array con numeri da 1 a 38
  numbers: number[] = Array.from({ length: 38 }, (_, i) => i + 1);

  // FormGroup per il form reattivo
  form!: FormGroup;

  constructor(
    public language: LanguageService,
    private alert: AlertService,
    private adminService: AdminService,
    private authService: AuthService,
    private util: UtilService,
    private fb: FormBuilder) {
    super();
    // Crea il form con 3 controlli: min, max, fase
    this.form = this.fb.group({
      min: [null, [Validators.required]],
      max: [null, [Validators.required]],
      turni: [null, [Validators.required]]
    });
  }


  ngOnInit() {
    this.getInfo()
  }


  onSubmit(): void {
    if (this.form.valid) {
      this.generaGiornate(this.form.value)
    } else {
      console.log("Form non valido");
    }
  }

  // Metodo per resettare la form
  onReset(): void {
    this.form.reset();  // Resetta il form
    this.giornate = []
  }

  generaGiornate(scelta: any) {

    try {

      let numeroMin = Number(scelta.min);
      let numeroMax = Number(scelta.max);
      // Chiamata al servizio per generare il calendario
      this.giornate = this.util.generaGiornate(numeroMin, numeroMax, scelta.turni);

    } catch (error: any) {
      this.alert.error(error.message);
    }


  }

  getInfo() {

    this.authService.getInfo()
      .pipe(
        map(data => new ShitCup(data)),
      ).subscribe({

        next: (result: ShitCup) => {
          this.lookups = result.lookup
        },
        error: (error: any) => {
          this.alert.error(error);
        },

      })

  }




  onConferma() {
    console.log("this.giornate", this.giornate);
    //this.setGeneraGiornate(this.giornate)
  }

  setGeneraGiornate(payload: any) {

    this.loading_btn = true;

    this.adminService.setGeneraGiornate(payload)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }
      )).subscribe({

        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

}