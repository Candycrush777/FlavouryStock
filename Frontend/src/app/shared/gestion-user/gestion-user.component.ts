import { Component } from '@angular/core';
import { User } from './../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-user',
  standalone: false,
  templateUrl: './gestion-user.component.html',
  styleUrl: './gestion-user.component.css',
})
export class GestionUserComponent {
  vistaTabla = false;
  mostrar = false;
  editarUser: Number | null = null

  /* 
ESTA SERA LA USADA PARA GUARDAR LOS LEIDOS DE LA DB

listaUsers: User []=[] 
*/

  /* ESTA LISTA ES LA FICTICIA */
  listaUsers: User[] = [
    {
      
      id_rol: 1,
      nombre: 'Vinicius',
      apellido1: 'Junior',
      apellido2: '',
      empresa: 'RMadrid',
      email: 'viniChef@mail.com',
      passwd: '12345678',
    },
    {
      id_rol: 2,
      nombre: 'Rosendo',
      apellido1: 'Mercado',
      apellido2: '',
      empresa: 'Rock&Roll',
      email: 'rosenCocina@mail.com',
      passwd: '12345678',
    },
    {
      id_rol: 2,
      nombre: 'Fito',
      apellido1: 'Cabrales',
      apellido2: '',
      empresa: 'Musica',
      email: 'fitoCocina@mail.com',
      passwd: '12345678',
    },
    {
      id_rol: 2,
      nombre: 'Antoine',
      apellido1: 'Griezmann',
      apellido2: '',
      empresa: 'AtMadrid',
      email: 'grizzCocina@mail.com',
      passwd: '12345678',
    },
  ];

  idRolUser = -1;
  nombreUser = '';
  apellido1User = '';
  apellido2User = '';
  empresaUser = '';
  emailUser = '';
  passwdUser = '';

  guardarUsuarioEditado() {

    /* NO TIENE MUCHO SENTIDO, PORQUE AL CREAR USER SE DEBERIA LEER DE LA DB */
    if (this.nombreUser.length == 0) {
      /* Si estan vacios un alert */
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Someone of your fields are empty!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else {
      /* CREAR USER FICTICIO PARA GUARDAR AL LISTADO */
      let user: User = {
        id_rol: this.idRolUser,
        nombre: this.nombreUser,
        apellido1: this.apellido1User,
        apellido2: this.apellido2User,
        empresa: this.empresaUser,
        email: this.emailUser,
        passwd: this.passwdUser,
      };

      this.listaUsers.push(user);
    }
  }

  prueba(){}

 /*  editar(id: Number){
    this.editarUser = this.editarUser === id ? null : id
  }

  guardar(id: number) {
    //console.log(`Guardando cambios de ID: ${id}`);
    this.editarUser = null; // Ocultar edición tras guardar
  } */


  /* METODOS PARA MOSTRAR OCULTAR LOS ELEMENTOS */
  mostrarCrear() {
    this.mostrar = !this.mostrar;
  }
  mostrarTabla() {
    this.vistaTabla = !this.vistaTabla;
  }
}
