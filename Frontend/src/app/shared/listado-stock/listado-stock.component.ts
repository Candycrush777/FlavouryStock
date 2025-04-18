import { Component, OnInit } from '@angular/core';
import { StockageView } from '../../models/stockageView';
import { StockageService } from '../../services/stockage.service';

@Component({
  selector: 'app-listado-stock',
  standalone: false,
  templateUrl: './listado-stock.component.html',
  styleUrls: ['./listado-stock.component.css'],
})
export class ListadoStockComponent implements OnInit {
  stockItems: StockageView[] = [];
  isFormVisible = false;
  isTableVisible = false;

  constructor(private stockageService: StockageService) {}

  ngOnInit() {
    this.getStockItems();
  }

  getStockItems(): void {
    this.stockageService.getAllStockages().subscribe(
      (data) => {
        this.stockItems = data; 
      },
      (error) => {
        console.error('Error obteniendo stock', error); 
      }
    );
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  toggleTable(): void {
    this.isTableVisible = !this.isTableVisible;
    this.isFormVisible = false;
  }
}


  
