import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { EtiquetaService } from './../../services/etiqueta.service';
import { Etiqueta } from '../../models/etiqueta';
import { error } from 'console';


@Component({
  selector: 'app-caducidades',
  standalone: false,
  templateUrl: './caducidades.component.html',
  styleUrl: './caducidades.component.css'
})
export class CaducidadesComponent {
  caducidadesList?: Etiqueta[]
  etiqueta?: Etiqueta
  modalTitle=""//para MODALS
  modalContent=""

  vista=false


  constructor(private etiquetaService:EtiquetaService){}

  /* ngOnInit(): void {
    this.getEtiquetasMP(); //llamamos a la funcion al iniciar el componente
  } */

  getEtiquetas(){
    this.etiquetaService.getAllEtiquetas().subscribe(
      (etiqueta)=>{
        this.caducidadesList = etiqueta
        console.log("DATOS RECIBIDOS EN getEti/ caducidades.ts", this.caducidadesList)
      }, error=>{
        console.log("Error obtenido en caducidades", error);
        
      }
    )
  }


  
  getEtiquetasP(){
    this.caducidadesList=[] // lo pongo vacio para resetear
    this.etiquetaService.getCaducaPronto().subscribe(
      (etiqueta)=>{
        this.caducidadesList = etiqueta
        console.log("Etiquetas recibidas CaducaP", this.caducidadesList)
        
      },error=>{

        console.log("Error obtenido en caducidades",error)
      }
    )
  }
  getEtiquetasMP(){
    this.caducidadesList=[] 
    this.etiquetaService.getCaducaMuyPronto().subscribe(
      (etiqueta)=>{
        this.caducidadesList = etiqueta
        console.log("Etiquetas recibidas CaducaP", this.caducidadesList)
        
      },error=>{

        console.log("Error obtenido en caducidades",error)
      }
    )
  }

  getCaducado(){
    this.caducidadesList=[] 
    this.etiquetaService.getCaducado().subscribe(
      (etiqueta)=>{
        this.caducidadesList = etiqueta
        console.log("Etiquetas recibidas Caducado", this.caducidadesList)
        
      },error=>{

        console.log("Error obtenido en caducidades",error)
      }
    )
  }

  getRecetas(){
    //todo AQUI YA NECESITO MENTE DESPEJADO, porque hay que coger la fecha como parametro
  }


  mostrar3(){
    this.vista = !this.vista
  }
}
