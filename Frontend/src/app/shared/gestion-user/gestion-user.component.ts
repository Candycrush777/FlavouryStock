import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-gestion-user',
  standalone: false,
  templateUrl: './gestion-user.component.html',
  styleUrl: './gestion-user.component.css',
})
export class GestionUserComponent {
  usersList: User[] = [] //ARRAY para leer desde BD

  modalTitle=""//para MODALS
  modalContent=""

  vistaTabla = true;//para mostrar FORM crearUser
  mostrar = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers(); //llamamos a la funcion al iniciar el componente
  }

  getUsers() {
    console.log('Intentando obtener usuarios...SE MUESTRA');
    this.userService.getAllUser().subscribe(
      (user) => {
        this.usersList = user;
        console.log('Datos recibidos en GetUSERS() gestion.ts:', this.usersList);
      },error=> {
        console.log('Error obtenido en usuarios', error);
      }
    );
  }



  openModal(content: string) {
    if (content === 'edit'){
      this.modalTitle="EDITANDO USUARIO"
      this.modalContent="SE HA QUEDADO BUENA LA TARDE"
    }else if (content ==="delete"){
      this.modalTitle="ELIMINANDO USUARIO"
      this.modalContent="SE HA QUEDADO BUENA LA TARDE, Pero seguro vas a eliminar este Usuario??"
    }
  }

  /* METODO PARA MOSTRAR-OCULTAR LOS ELEMENTOS */
  mostrarCrear() {
    this.mostrar = !this.mostrar;
  }
}
