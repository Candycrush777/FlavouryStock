import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent{
 
  @Input() modalTitle: string= ""
  @Input() modalContent: string= ""



}
