import { Component, OnInit } from '@angular/core';
import { Stockage, StockageView } from '../../models/stockageView';
import { StockageService } from '../../services/stockage.service';

@Component({
  selector: 'app-listado-stock',
  standalone: false,
  templateUrl: './listado-stock.component.html',
  styleUrls: ['./listado-stock.component.css'],
})
export class ListadoStockComponent implements OnInit {
  stockItems: StockageView[] = [];
  selectedIngredientId: number | null = null;
  selectedIngredientName: string = '';
  mostrarModal = false;
  modalTitle = '';
  isFormVisible = false;




  // Modelo del formulario (valores undefined para mostrar placeholders)
  formModel: Stockage = {
    id_ingrediente: 0,
    cantidad_almacen: undefined,
    cantidad_nevera: undefined,
    cantidad_congelador: undefined
  };

  constructor(private stockageService: StockageService) {}

  ngOnInit() {
    this.getStockItems();
  }

  getStockItems(): void {
    this.stockageService.getAllStockages().subscribe(
      (data) => (this.stockItems = data),
      (error) => console.error('Error obteniendo stock', error)
    );
  }




  openEditForm(item: StockageView): void {

    console.log('Item recibido:', item); 
    this.selectedIngredientId = item.id_ingrediente;
    this.selectedIngredientName = item.ingrediente;
    this.modalTitle = 'Actualizar Cantidades';
    
    // Inicializa con undefined para mostrar placeholders
    this.formModel = {
      id_ingrediente: item.id_ingrediente,
      cantidad_almacen: undefined,
      cantidad_nevera: undefined,
      cantidad_congelador: undefined
    };

      // Debug: Verifica el ID asignado
  console.log('ID asignado:', this.formModel.id_ingrediente); 
    this.mostrarModal = true;
  }

  closeModal(): void {
    this.mostrarModal = false;
  }

  onSubmitForm(): void {
    // Convertir undefined a 0
    const cantidad_almacen = this.formModel.cantidad_almacen || 0;
    const cantidad_nevera = this.formModel.cantidad_nevera || 0;
    const cantidad_congelador = this.formModel.cantidad_congelador || 0;
  
    // Validación frontend
    if (cantidad_almacen + cantidad_nevera + cantidad_congelador <= 0) {
      alert('Debes ingresar al menos una cantidad mayor que 0');
      return;
    }
  
    // Validar que el ID sea válido
    if (this.selectedIngredientId == null) {
      alert('Error: No se ha seleccionado un ingrediente válido.');
      return;
    }
  
    // Mostrar ID en consola
    console.log('ID a actualizar:', this.selectedIngredientId);
  
    // Preparar datos para el servicio
    const updateData = {
      cantidad_almacen: cantidad_almacen,
      cantidad_nevera: cantidad_nevera,
      cantidad_congelador: cantidad_congelador
    };
  
    // Llamar al servicio usando selectedIngredientId (más confiable)
    this.stockageService.updateStockage(this.selectedIngredientId!, updateData).subscribe({
      next: () => {
        console.log('Actualización exitosa');
        this.getStockItems(); // Actualizar lista
        this.closeModal();
      },
      error: (err) => {
        console.error('Error en actualización:', err);
        alert('Error al actualizar el stock');
      }
    });
  }


  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}

