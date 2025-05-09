import { Component } from '@angular/core';
import { EtiquetaService } from '../../services/etiqueta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  standalone: false,
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent {
  constructor(private etiquetaService: EtiquetaService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const showAlert = localStorage.getItem('caducidadMostrada');
      console.log(showAlert);
      if (showAlert !== 'true') {
        this.etiquetaService.getCaducaMuyPronto().subscribe((productos) => {
          if (productos.length > 0) {
            let nombre = productos.map((p) => p.nombre).join(', ');
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: '¡Productos por caducar!',
              html: `<strong>${nombre}</strong><br>caducan muy pronto.`,
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#f18c57',
            });
            localStorage.setItem('caducidadMostrada', 'true');
          }
        });
      }
    }
  }
}
