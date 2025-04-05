import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-user-modal',
  standalone: false,
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})
export class EditUserModalComponent {

  @Input() modalTitle: string= ""
  @Input() modalContent: string= ""
}
