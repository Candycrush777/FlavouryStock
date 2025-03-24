import { Component } from '@angular/core';
import { User } from './../../models/user';

@Component({
  selector: 'app-gestion-user',
  standalone: false,
  templateUrl: './gestion-user.component.html',
  styleUrl: './gestion-user.component.css'
})
export class GestionUserComponent {

listaUsers: User []=[]

guardarUsuario(){}

}
