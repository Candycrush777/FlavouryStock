import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  modalTitle= ""
  modalContent = ""

  openModal(content: string){
    if (content === 'stock') {
      this.modalTitle = "Gestion de Stock"
      this.modalContent = "Aquí puedras gestionar tu inventario de ingredientes, organizarlos por ubicación (nevera, despensa, congelador...)."
    }else if (content === "recetas"){
      this.modalTitle = "Recetas inteligentes"
      this.modalContent = "Descubre recetas exclusivas adaptadas a tu stock de ingredientes, y además podrás acceder a nuestro listado de recetas. "

    }else if(content === "registro"){
      this.modalTitle = "Registro de productos"
      this.modalContent = "Registra y organiza tus productos fácilmente."
    }else if(content === "alertas"){
      this.modalTitle = "Alertas"
      this.modalContent = "Recibe alertas sobre los productos próximo a caducar y reduce el desperdicio."
    }
  }
}
