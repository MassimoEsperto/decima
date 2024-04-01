import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sorteggi-gironi',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule
  ],
  templateUrl: './sorteggi-gironi.component.html',
  styleUrl: './sorteggi-gironi.component.scss'
})
export class SorteggiGironiComponent extends OnInitComp implements OnInit {

  start: boolean = false
  sorteggiabili: any
  girone: string = ""
  sorteggiati: any = []

  constructor(
    public language: LanguageService,
    private alert: AlertService,
    private adminService: AdminService,
    private ref: ChangeDetectorRef) {
    super();
  }


  ngOnInit() {

  }

  ngAfterViewChecked() {
    this.ref.detectChanges();
  }

  selected() {
    return this.sorteggiabili ? this.sorteggiabili.utenti.filter((e: { selected: boolean; }) => e.selected === true) : [];
  }

  selezionaTutto(event: any) {

    let checked = event.target.checked

    for (let s of this.sorteggiabili.utenti) {
      s.selected = checked
    }
  }


  sorteggio() {

    let lista = this.selected();

    let ran = this.randomInteger(0, lista.length - 1)
    this.sorteggiati.push(lista[ran])
    this.removeElement(lista[ran].id)

  }


  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  removeElement(key: number) {
    this.sorteggiabili.utenti.forEach((value: { id: number; }, index: any) => {
      if (value.id == key) this.sorteggiabili.utenti.splice(index, 1);
    });
  }


  salvaGirone() {

    let lista = this.sorteggiati.map((item: { id: any; }) => item.id);

    let payload = { squadre: lista, girone: this.girone }
    this.setGeneraCompetizioneGironi(payload)
   
  }

  getStartNewGrirone() {

    this.adminService.getGeneraCompetizioneGironi()

      .subscribe({
        next: (result: any) => {

          this.sorteggiabili = result;
          this.start = true
          this.girone = ''

        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }


  setGeneraCompetizioneGironi(payload: any) {

    this.loading_btn = true;

    this.adminService.setGeneraCompetizioneGironi(payload)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }
      )).subscribe({

        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          this.start = false
          this.sorteggiati = []
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

}
