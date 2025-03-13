import { Component } from '@angular/core';

@Component({
  selector: 'app-stock',
  standalone: false,
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent {
  stockItems = [
    {
      peso: '500g',
      alimento: 'Arroz',
      categoria: 'Cereal',
      foto: 'assets/arroz.jpg',
    },
    {
      peso: '1kg',
      alimento: 'Frijoles',
      categoria: 'Legumbre',
      foto: 'https://img.freepik.com/fotos-premium/frijoles-rojos_64161-174.jpg',
    },
    {
      peso: '2kg',
      alimento: 'Harina',
      categoria: 'Harina',
      foto: 'assets/harina.jpg',
    },
    {
      peso: '750g',
      alimento: 'Azúcar',
      categoria: 'Endulzante',
      foto: 'https://imagenes.heraldo.es/files/image_1920_1080/uploads/imagenes/2025/01/09/azucar-gsc1.jpeg',
    },
    {
      peso: '1.5kg',
      alimento: 'Macarrones',
      categoria: 'Cereal',
      foto: 'assets/macarrones.jpg',
    },
    {
      peso: '500g',
      alimento: 'Café',
      categoria: 'Bebida',
      foto: 'assets/cafe.jpg',
    },
    {
      peso: '1kg',
      alimento: 'Carne Roja',
      categoria: 'Carne',
      foto: 'assets/carneRoja.jpg',
    },
    {
      peso: '1kg',
      alimento: 'Salmón',
      categoria: 'Pescado',
      foto: 'assets/salmon.jpg',
    },
  ];

 
  
}