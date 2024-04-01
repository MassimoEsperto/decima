import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from 'src/servizi/local/confirm-dialog.service';

@Component({
  selector: 'my-confirm-dialog',
  templateUrl: './my-confirm-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrl: './my-confirm-dialog.component.scss'
})
export class MyConfirmDialog implements OnInit {  

  message: any;  

  constructor(private confirmDialogService: ConfirmDialogService) { }  

  ngOnInit(): any {  
   
      this.confirmDialogService.getMessage().subscribe(message => {  
          this.message = message;  
      });  
  }  
}  
