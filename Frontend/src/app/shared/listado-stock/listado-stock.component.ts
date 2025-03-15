import { Component } from '@angular/core';

@Component({
  selector: 'app-listado-stock',
  standalone: false,
  templateUrl: './listado-stock.component.html',
  styleUrl: './listado-stock.component.css'
})
export class ListadoStockComponent {

  stockItems = [
    {
      alimento: {
        nombre: 'Arroz',
        foto: 'assets/arroz.jpg',
      },
      id: '#ARZ-001',
      peso: '500g',
      categoria: 'Cereal',
      estado: 'En Stock'
    },
    {
      alimento: {
        nombre: 'Frijoles',
        foto: 'https://img.freepik.com/fotos-premium/frijoles-rojos_64161-174.jpg',
      },
      id: '#FRJ-045',
      peso: '1kg',
      categoria: 'Legumbre',
      estado: 'Sin Stock'
    },
    {
      alimento: {
        nombre: 'Harina',
        foto: 'assets/harina.jpg',
      },
      id: '#HRN-112',
      peso: '2kg',
      categoria: 'Harina',
      estado: 'Pedido'
    },
    {
      alimento: {
        nombre: 'Azúcar',
        foto: 'https://imagenes.heraldo.es/files/image_1920_1080/uploads/imagenes/2025/01/09/azucar-gsc1.jpeg',
      },
      id: '#AZC-204',
      peso: '750g',
      categoria: 'Endulzante',
      estado: 'En Stock'
    },
    {
      alimento: {
        nombre: 'Macarrones',
        foto: 'assets/macarrones.jpg',
      },
      id: '#MCR-145',
      peso: '1.5kg',
      categoria: 'Cereal',
      estado: 'Sin Stock'
    },
    {
      alimento: {
        nombre: 'Café',
        foto: 'assets/cafe.jpg',
      },
      id: '#CAF-103',
      peso: '500g',
      categoria: 'Bebida',
      estado: 'En Stock'
    },
    {
      alimento: {
        nombre: 'Carne Roja',
        foto: 'assets/carneRoja.jpg',
      },
      id: '#CRJ-201',
      peso: '1kg',
      categoria: 'Carne',
      estado: 'En Stock'
    },
    {
      alimento: {
        nombre: 'Salmón',
        foto: 'assets/salmon.jpg',
      },
      id: '#SLM-501',
      peso: '1kg',
      categoria: 'Pescado',
      estado: 'En Stock'
    },
  ];
 
  isFormVisible = false;
  newProduct = {
    alimento: '',
    peso: null,
    categoria: 'Fruta',
    estado: 'En Stock'  
  };

 // Función para alternar la visibilidad del formulario
toggleForm() {
  this.isFormVisible = !this.isFormVisible;
}

}
  
