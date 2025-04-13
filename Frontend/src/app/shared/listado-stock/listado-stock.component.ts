import { Component } from '@angular/core';



@Component({
  selector: 'app-listado-stock',
  standalone: false,
  templateUrl: './listado-stock.component.html',
  styleUrl: './listado-stock.component.css',
  
})
export class ListadoStockComponent {
addProduct() {
throw new Error('Method not implemented.');
}

stockItems = [
  {
    alimento: {
      nombre: 'Arroz',
      foto: 'assets/arroz.jpg',
    },
    id: '#ARZ-001',
    almacen: 5,
    nevera: 3,
    congelador: 2,
    estado: 'En Stock'
  },
  {
    alimento: {
      nombre: 'Frijoles',
      foto: 'https://img.freepik.com/fotos-premium/frijoles-rojos_64161-174.jpg',
    },
    id: '#FRJ-045',
    almacen: 0,
    nevera: 0,
    congelador: 0,
    estado: 'Sin Stock'
  },
  {
    alimento: {
      nombre: 'Harina',
      foto: 'assets/harina.jpg',
    },
    id: '#HRN-112',
    almacen: 4,
    nevera: 1,
    congelador: 0,
    estado: 'Pedido'
  },
  {
    alimento: {
      nombre: 'Azúcar',
      foto: 'https://imagenes.heraldo.es/files/image_1920_1080/uploads/imagenes/2025/01/09/azucar-gsc1.jpeg',
    },
    id: '#AZC-204',
    almacen: 3,
    nevera: 2,
    congelador: 1,
    estado: 'En Stock'
  },
  {
    alimento: {
      nombre: 'Macarrones',
      foto: 'assets/macarrones.jpg',
    },
    id: '#MCR-145',
    almacen: 0,
    nevera: 0,
    congelador: 0,
    estado: 'Sin Stock'
  },
  {
    alimento: {
      nombre: 'Café',
      foto: 'assets/cafe.jpg',
    },
    id: '#CAF-103',
    almacen: 2,
    nevera: 1,
    congelador: 1,
    estado: 'En Stock'
  },
  {
    alimento: {
      nombre: 'Carne Roja',
      foto: 'assets/carneRoja.jpg',
    },
    id: '#CRJ-201',
    almacen: 0,
    nevera: 3,
    congelador: 2,
    estado: 'En Stock'
  },
  {
    alimento: {
      nombre: 'Salmón',
      foto: 'assets/salmon.jpg',
    },
    id: '#SLM-501',
    almacen: 0,
    nevera: 2,
    congelador: 3,
    estado: 'En Stock'
  },
];

 
  isFormVisible: boolean = false;  
  isTableVisible: boolean = false; 

  

toggleForm() {
  this.isFormVisible = !this.isFormVisible;
}

toggleTable() {
  this.isTableVisible = !this.isTableVisible;  
  this.isFormVisible = false; 
}

}
  
