import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-caducidades',
  standalone: false,
  templateUrl: './caducidades.component.html',
  styleUrl: './caducidades.component.css'
})
export class CaducidadesComponent {
  caducidadesList?: Ingrediente[]
  ingrediente?: Ingrediente
  modalTitle=""//para MODALS
  modalContent=""

  vista=false


  constructor(){}

  cambioVista(){
    this.vista = !this.vista
  }
}
