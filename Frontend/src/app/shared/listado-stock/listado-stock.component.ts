import { Component, OnInit } from '@angular/core';
import { RegisterBasketPayload, Stockage, StockageView } from '../../models/stockageView';
import { StockageService } from '../../services/stockage.service';
import Swal from 'sweetalert2';
import { EtiquetaService } from '../../services/etiqueta.service';
import { Etiqueta } from '../../models/etiqueta';

@Component({
  selector: 'app-listado-stock',
  standalone: false,
  templateUrl: './listado-stock.component.html',
  styleUrls: ['./listado-stock.component.css'],
})
export class ListadoStockComponent implements OnInit {
  allItems: StockageView[] = [];
  stockItems: StockageView[] = [];
  etiquetas: Etiqueta[] = [];
  allEtiquetas: Etiqueta[] = [];

  selectedIngredientId: number | null = null;
  selectedIngredientName: string = '';
  mostrarModal = false;
  modalTitle = '';
  isFormVisible = false;
  isFormVisible2 = false;
  selectedCategory: string = '';
  searchTerm: string = '';
  searchEtiqueta: string = '';

  resultadosEtiqueta: Etiqueta[] | null = null;
  mostrarResultadoEtiquetaModal = false;
  currentEtiquetaIndex = 0;

  // Modelo del formulario (valores undefined para mostrar placeholders)
  formModel: Stockage = {
    id_ingrediente: 0,
    cantidad_almacen: undefined,
    cantidad_nevera: undefined,
    cantidad_congelador: undefined,
  };

  constructor(
    private stockageService: StockageService,
    private etiquetaService: EtiquetaService
  ) {}

  ngOnInit() {
    this.stockageService.getAllStockages().subscribe((items) => {
      this.allItems = items;
      this.stockItems = [...items]; // al principio muestro todo
    });

    this.etiquetaService.getAllEtiquetas().subscribe({
      next: (res) => {
        this.allEtiquetas = res;
        this.etiquetas = [...res];
      },
      error: (err) => console.error('Error cargando etiquetas:', err),
    });
  }

  getStockItems(): void {
    this.stockageService.getAllStockages().subscribe(
      (data) => (this.stockItems = data),
      (error) => console.error('Error obteniendo stock', error)
    );
  }

  filterByCategory() {
    if (!this.selectedCategory) {
      // si es cadena vacía (o “Todas”), volver a mostrar todo
      this.stockItems = [...this.allItems];
    } else {
      this.stockItems = this.allItems.filter(
        (item) => item.categoria === this.selectedCategory
      );
    }
  }

  buscarStockage() {
    if (this.searchTerm.trim() !== '') {
      this.stockageService.buscarStockage(this.searchTerm).subscribe({
        next: (result) => {
          this.stockItems = result;
        },
        error: (error) => {
          console.error('Error al buscar:', error);
          this.stockItems = [];
        },
      });
    } else {
      this.stockItems = [...this.allItems];
    }
  }

  //Poner Ingredientes a 0

  clearStockage(idIngrediente: number): void {
    console.log('Ingrediente a resetear stock:', idIngrediente);

    Swal.fire({
      title: '¿Estás seguro de resetear el stock a 0?',
      text: 'Esta acción pondrá todas las cantidades de este ingrediente a cero y no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, resetear',
      cancelButtonText: 'No, mantener',
      confirmButtonColor: '#000000B3',
      cancelButtonColor: '#888888B3',
      didOpen: () => {
        const addHoverEffects = (
          button: HTMLElement,
          originalColor: string
        ) => {
          button.style.transition = '0.15s ease-in-out';

          button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = 'rgba(237, 117, 87, 0.645)';
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
          });
          button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = originalColor;
            button.style.boxShadow = 'none';
          });
        };

        const confirmBtn = Swal.getConfirmButton();
        if (confirmBtn) {
          confirmBtn.style.borderRadius = '10px';
          addHoverEffects(confirmBtn, '#000000B3');
        }

        const cancelBtn = Swal.getCancelButton();
        if (cancelBtn) {
          cancelBtn.style.borderRadius = '10px';
          addHoverEffects(cancelBtn, '#888888B3');
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.stockageService.clearStocage(idIngrediente, {}).subscribe({
          next: (updated) => {
            console.log('Stock reseteado:', updated);
            Swal.fire('Stock reseteado a 0 con éxito', '', 'success');
            this.getStockItems();
          },
          error: (err) => {
            console.error('Error al resetear stock', err);
            Swal.fire('Error', 'No se pudo resetear el stock', 'error');
          },
        });
      } else if (result.isDismissed) {
        Swal.fire('Stock no modificado', '', 'info');
      }
    });
  }

  //editar stock

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
      cantidad_congelador: undefined,
    };

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

  // Función para dar estilo a botones de SweetAlert
  const styleButton = (btn: HTMLElement) => {
    btn.style.borderRadius = '10px';
    btn.style.transition = '0.15s ease-in-out';
    btn.addEventListener('mouseenter', () => {
      btn.style.backgroundColor = 'rgba(237, 117, 87, 0.645)';
      btn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.backgroundColor = '#000000B3';
      btn.style.boxShadow = 'none';
    });
  };

  // Validación frontend
  if (cantidad_almacen + cantidad_nevera + cantidad_congelador <= 0) {
    Swal.fire({
      title: 'Debes ingresar al menos una cantidad mayor que 0',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#000000B3',
      didOpen: () => {
        const btn = Swal.getConfirmButton();
        if (btn) styleButton(btn);
      }
    });
    return;
  }

  if (this.selectedIngredientId == null) {
    Swal.fire({
      title: 'Error: No se ha seleccionado un ingrediente válido.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#000000B3',
      didOpen: () => {
        const btn = Swal.getConfirmButton();
        if (btn) styleButton(btn);
      }
    });
    return;
  }

  console.log('ID a actualizar:', this.selectedIngredientId);

  const updateData = {
    cantidad_almacen,
    cantidad_nevera,
    cantidad_congelador,
  };

  // Llamada al servicio
  this.stockageService
    .updateStockage(this.selectedIngredientId, updateData)
    .subscribe({
      next: () => {
        Swal.fire({
          title: 'Stock actualizado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#000000B3',
          didOpen: () => {
            const btn = Swal.getConfirmButton();
            if (btn) styleButton(btn);
          }
        }).then(() => {
          this.getStockItems();
          this.closeModal();
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error al actualizar el stock',
          text: err?.message ?? '',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#000000B3',
          didOpen: () => {
            const btn = Swal.getConfirmButton();
            if (btn) styleButton(btn);
          }
        });
      },
    });
}

  //Registrar compra

  mostrarRegisterModal = false;

  basketModel: Stockage = {
    id_ingrediente: 0,
    cantidad_almacen: undefined,
    cantidad_nevera: undefined,
    cantidad_congelador: undefined,
  };

  // Abrir modal
  openRegisterModal(item: StockageView): void {
    this.selectedIngredientId = item.id_ingrediente;
    this.selectedIngredientName = item.ingrediente;
    this.modalTitle = 'Registrar Etiqueta';
    this.basketModel = {
      id_ingrediente: item.id_ingrediente,
      cantidad_almacen: undefined,
      cantidad_nevera: undefined,
      cantidad_congelador: undefined,
    };
    this.mostrarRegisterModal = true;
  }

  // Cerrar modal
  closeRegisterModal(): void {
    this.mostrarRegisterModal = false;
  }

  // Envío del formulario
onSubmitRegister(): void {
  const userId = Number(localStorage.getItem('userId'));
  const payload: RegisterBasketPayload = {
    id_ingrediente: this.basketModel.id_ingrediente,
    cantidad_almacen: this.basketModel.cantidad_almacen ?? 0,
    cantidad_nevera: this.basketModel.cantidad_nevera ?? 0,
    cantidad_congelador: this.basketModel.cantidad_congelador ?? 0,
    id_usuario: userId
  };

  this.stockageService.registerBasket(payload).subscribe({
    next: (res) => {
      Swal.fire({
        title: res.message,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#000000B3',
        didOpen: () => {
          const btn = Swal.getConfirmButton();
          if (btn) {
            btn.style.borderRadius = '10px';
            btn.style.transition = '0.15s ease-in-out';
            btn.addEventListener('mouseenter', () => {
              btn.style.backgroundColor = 'rgba(237, 117, 87, 0.645)';
              btn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            });
            btn.addEventListener('mouseleave', () => {
              btn.style.backgroundColor = '#000000B3';
              btn.style.boxShadow = 'none';
            });
          }
        }
      }).then(() => {
        this.getStockItems();
        this.closeRegisterModal();
      });
    },
    error: (err) => {
      Swal.fire({
        title: 'Error generando etiquetas',
        text: err?.message ?? '',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#000000B3',
        didOpen: () => {
          const btn = Swal.getConfirmButton();
          if (btn) {
            btn.style.borderRadius = '10px';
            btn.style.transition = '0.15s ease-in-out';
            btn.addEventListener('mouseenter', () => {
              btn.style.backgroundColor = 'rgba(237, 117, 87, 0.645)';
              btn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            });
            btn.addEventListener('mouseleave', () => {
              btn.style.backgroundColor = '#000000B3';
              btn.style.boxShadow = 'none';
            });
          }
        }
      });
    },
  });
}

  deleteIngredient(idIngrediente: number): void {
    console.log('Ingrediente a eliminar:', idIngrediente);

    Swal.fire({
      title: '¿Estás seguro de eliminar este ingrediente?',
      text: 'Esta acción no se puede deshacer',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: `No, mantener`,
      confirmButtonColor: '#000000B3',
      cancelButtonColor: '#888888B3',

      didOpen: () => {
        const addHoverEffects = (
          button: HTMLElement,
          originalColor: string
        ) => {
          button.style.transition = '0.15s ease-in-out';

          button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = 'rgba(237, 117, 87, 0.645)';
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
          });
          button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = '#000000B3';
            button.style.boxShadow = 'none';
          });
        };

        const confirmBtn = Swal.getConfirmButton();
        if (confirmBtn) {
          confirmBtn.style.borderRadius = '10px';
          addHoverEffects(confirmBtn, '#3085d6');
        }

        const cancelBtn = Swal.getCancelButton();
        if (cancelBtn) {
          cancelBtn.style.borderRadius = '10px';
          addHoverEffects(cancelBtn, '#3085d6');
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.stockageService.deleteIngredientById(idIngrediente).subscribe({
          next: (response) => {
            console.log('Ingrediente eliminado:', response);
            Swal.fire('Ingrediente eliminado con éxito', '', 'success');

            this.getStockItems();
          },
          error: (error) => {
            console.error('Error al eliminar ingrediente', error);
            Swal.fire('Error', 'No se pudo eliminar el ingrediente', 'error');
          },
        });
      } else if (result.isDismissed) {
        Swal.fire('El ingrediente no ha sido eliminado', '', 'info');
      }
    });
  }

  buscarEtiqueta() {
    if (this.searchEtiqueta.trim() !== '') {
      this.etiquetaService.buscarEtiqueta(this.searchEtiqueta).subscribe({
        next: (result) => {
          this.resultadosEtiqueta = result;
          this.currentEtiquetaIndex = 0; // <-- reinicia al primero
          this.mostrarResultadoEtiquetaModal = true;
        },
        error: () => {
          this.resultadosEtiqueta = [];
          this.currentEtiquetaIndex = 0; // <-- idem
          this.mostrarResultadoEtiquetaModal = true;
        },
      });
    } else {
      this.resultadosEtiqueta = [...this.allEtiquetas];
      this.currentEtiquetaIndex = 0; // <-- idem
      this.mostrarResultadoEtiquetaModal = true;
    }
  }

  // Funciones para la navegación del carrusel
  nextEtiqueta(): void {
    if (
      this.resultadosEtiqueta &&
      this.currentEtiquetaIndex < this.resultadosEtiqueta.length - 1
    ) {
      this.currentEtiquetaIndex++;
    }
  }

  previousEtiqueta(): void {
    if (this.currentEtiquetaIndex > 0) {
      this.currentEtiquetaIndex--;
    }
  }

  cerrarResultadoEtiquetaModal(): void {
    this.mostrarResultadoEtiquetaModal = false;
    this.resultadosEtiqueta = null;
  }
  /** Carga TODAS las etiquetas desde el backend y las muestra */
  getAllEtiquetas2() {
    console.log('→ Llamando a getAllEtiquetas()');
    this.etiquetaService.getAllEtiquetas().subscribe({
      next: (res) => {
        this.allEtiquetas = res;
        this.etiquetas = [...res];
        console.log('Etiquetas cargadas (total):', this.etiquetas);
      },
      error: (err) => {
        console.error('Error al cargar todas las etiquetas:', err);
        this.allEtiquetas = [];
        this.etiquetas = [];
      },
    });
  }

  getAllEtiquetas(): void {
    console.log('→ Llamando a getAllEtiquetas()');
    this.etiquetaService.getAllEtiquetas().subscribe({
      next: (res) => {
        this.allEtiquetas = res;                // guardas para otros usos si hiciera falta
        this.resultadosEtiqueta = [...res];     // el carrusel trabaja sobre este array
        this.currentEtiquetaIndex = 0;          // arrancamos en la primera etiqueta
        this.mostrarResultadoEtiquetaModal = true;  // abrimos el modal–carrusel
        console.log('Modal abierto con todas las etiquetas:', this.resultadosEtiqueta);
      },
      error: (err) => {
        console.error('Error al cargar todas las etiquetas:', err);
        this.allEtiquetas = [];
        this.resultadosEtiqueta = [];
        // Opcional: podrías abrir el modal y mostrar "no hay resultados"
        this.currentEtiquetaIndex = 0;
        this.mostrarResultadoEtiquetaModal = true;
      },
    });
  }
  

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
  toggleFormEtiqueta(): void {
    this.isFormVisible2 = !this.isFormVisible2;
  }
  //modalETIQUETA
  mostrarModalEtiqueta = false;

  openEtiqueta(item?: Etiqueta) {
    console.log('Item recibido:', item);

    this.selectedIngredientId = null;
    //this.selectedIngredientName = item.nombre;
    this.modalTitle = 'ETIQUETAS';

    // Inicializa con undefined para mostrar placeholders

    console.log('ID asignado:', this.formModel.id_ingrediente);
    this.mostrarModalEtiqueta = true;
  }
}
