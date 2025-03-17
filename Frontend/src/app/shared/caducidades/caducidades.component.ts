import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-caducidades',
  standalone: false,
  templateUrl: './caducidades.component.html',
  styleUrl: './caducidades.component.css'
})
export class CaducidadesComponent {

  vista=false


  cambioVista(){
    this.vista = !this.vista
  }
}
