import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EtiquetaService } from './../../services/etiqueta.service';
import { Etiqueta } from '../../models/etiqueta';
import { error } from 'console';
import Swal from 'sweetalert2';
import { Recipe } from '../../models/recipes';
import { response } from 'express';

@Component({
  selector: 'app-caducidades',
  standalone: false,
  templateUrl: './caducidades.component.html',
  styleUrl: './caducidades.component.css',
})
export class CaducidadesComponent {
  caducidadesList?: Etiqueta[]
  etiqueta?: Etiqueta
  recipesPosibles?: Recipe[]
  modalTitle = '' //para MODALS
  modalContent = ''

  constructor(private etiquetaService: EtiquetaService) {}

  /* ngOnInit(): void {
   //llamamos a la funcion al iniciar el componente NO NECESARIO
    this.getEtiquetasMP();
  } */

  /* ngOnInit(): void {
    setTimeout(() => {
      this.caducidadesExiste(); // verificamos existencia de caducidades
    }, 3000);
  } */
 

  getEtiquetas() {
    this.etiquetaService.getAllEtiquetas().subscribe(
      (etiqueta) => {
        this.caducidadesList = etiqueta;
        console.log(
          'DATOS RECIBIDOS EN getEti/ caducidades.ts',
          this.caducidadesList
        );
      },
      (error) => {
        console.log('Error obtenido en caducidades', error);
      }
    );
  }

  getEtiquetasP() {
    this.caducidadesList = [] // lo pongo vacio para resetear
    this.etiquetaService.getCaducaPronto().subscribe(
      (etiqueta) => {
        this.caducidadesList = etiqueta;
        console.log('Etiquetas recibidas CaducaP', this.caducidadesList);
      },
      (error) => {
        console.log('Error obtenido en caducidades', error);
      }
    );
  }
  getEtiquetasMP() {
    this.caducidadesList = [];
    this.etiquetaService.getCaducaMuyPronto().subscribe(
      (etiqueta) => {
        this.caducidadesList = etiqueta;
        console.log('Etiquetas recibidas CaducaP', this.caducidadesList);
      },
      (error) => {
        console.log('Error obtenido en caducidades', error);
      }
    );
  }

  getCaducado() {
    this.caducidadesList = [];
    this.etiquetaService.getCaducado().subscribe(
      (etiqueta) => {
        this.caducidadesList = etiqueta;
        console.log('Etiquetas recibidas Caducado', this.caducidadesList);
      },
      (error) => {
        console.log('Error obtenido en caducidades/caducado', error);
      }
    );
  }

  getRecetasPosibleId(idIngred:number) {
    //this.caducidadesList = []
    this.etiquetaService.getRecetasPosId(idIngred).subscribe({
      next: (response)=>{
        //this.caducidadesList = etiqueta;
        console.log('Etiquetas recibidas para posible receta', response)
      }, error:(error) => {
        console.log('Error obtenido en recetaPosibleId', error);
      }
    })
  }

  

  

  caducidadesExiste() {
    if (this.getEtiquetasMP.length != 0 || this.getEtiquetasP.length != 0) {
      /* Swal.fire({
        title: 'BUEN TRABAJO',
        text: 'Tienes, no tienes ningún alimento cercano a caducar',
        icon: 'success',
      }); */
      return true
    }
    return false
  }
}
