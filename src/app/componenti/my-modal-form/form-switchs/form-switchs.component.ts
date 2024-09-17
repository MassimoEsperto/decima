import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from 'src/servizi/local/modal.service';
import { MyButton } from '../../my-button/my-button.component';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';

@Component({
  selector: 'form-switchs',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule
  ],
  templateUrl: './form-switchs.component.html',
  styleUrl: './form-switchs.component.scss',
  providers: [ModalService],
})
export class FormSwitchs {

  @Output() mySubmit = new EventEmitter();
  @Input() data: any;
  loading_btn: boolean = false

  constructor(
    public language: LanguageService,
    private alert: AlertService,
    private modale: ModalService
  ) { }


  successo() {

    this.alert.success(this.language.label.alert.success);
    this.mySubmit.emit(true)
    this.modale.clodeModal()

  }

  goUp(index: number) {

    if (index === 0) {
      console.log('do nothing')
    }
    else {
      let temp = this.data[index - 1];
      this.data[index - 1] = this.data[index];
      this.data[index] = temp;

      this.data[index - 1].ordine = index;
      this.data[index].ordine = index + 1;
    }

  }

  goDown(index: number) {

    if (index == this.data.length) {
      console.log('do nothing')
    }
    else {
      const temp = this.data[index + 1];
      this.data[index + 1] = this.data[index];
      this.data[index] = temp;

      this.data[index + 1].ordine = index + 2;
      this.data[index].ordine = index + 1;
    }

  }

}
