import { Component } from '@angular/core';
import { EtiquetaService } from '../../services/etiqueta.service';
import Swal from 'sweetalert2';
import { Etiqueta } from '../../models/etiqueta';

@Component({
  selector: 'app-inicio-admin',
  standalone: false,
  templateUrl: './inicio-admin.component.html',
  styleUrl: './inicio-admin.component.css'
})
export class InicioAdminComponent {
  modalTitle= ""
  modalContent = ""
  constructor(private etiquetaService: EtiquetaService ) {}

  ngOnInit(): void {
    this.etiquetaService.getCaducaMuyPronto().subscribe((productos) => {
      if (productos.length > 0) {
        let nombre = productos.map(p => p.nombre).join(', ')
        Swal.fire({
          icon: 'warning',
          title: '¡Productos por caducar!',
          html: `<strong>${nombre}</strong><br>caducan muy pronto.`,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#f18c57'
        })
      }
    })
    
  }


}
