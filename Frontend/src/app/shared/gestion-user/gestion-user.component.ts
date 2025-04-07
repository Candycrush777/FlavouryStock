import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { response } from 'express';


@Component({
  selector: 'app-gestion-user',
  standalone: false,
  templateUrl: './gestion-user.component.html',
  styleUrl: './gestion-user.component.css',
})
export class GestionUserComponent {
  usersList: User[] = [] //ARRAY para leer desde BD
  user?: User
  modalTitle=""//para MODALS
  modalContent=""
  usuarioAEditar: User | null = null//para el edit
  UsuarioAEliminar: User | null = null//para delete

/*   vistaTabla = true;//para mostrar FORM crearUser
  mostrar = false; */

  constructor(private userService: UserService) {}

 

  ngOnInit(): void {
    this.getUsers(); //llamamos a la funcion al iniciar el componente
  }

  getUsers() {
    
    this.userService.getAllUser().subscribe(
      (user) => {
        this.usersList = user;
        console.log('Datos recibidos en GetUSERS() gestion.ts:', this.usersList);
      },error=> {
        console.log('Error obtenido en usuarios', error);
      }
    );
  }

  editUser(){
    if (this.usuarioAEditar) {
      
      this.userService.UpdateUserById(this.usuarioAEditar.id_usuario!/* asercion */, this.usuarioAEditar).subscribe({
        next: (response) =>{
          console.log('Comprobar Usuario modificado correctamente', response);
          Swal.fire("Usuario actualizado correctamente", "success")
          this.getUsers()// Para actualizar los cambios
          //this.cerrarModal();  Cerrar el modal después de guardar
        },
        error: (error) => {
          console.log('Error al editar usuario', error)
          Swal.fire('Error', 'No se pudo actualizar el usuario', 'error')
        }
      })
    }
  }





  openModal(content: string, usuario?:User ) {
    if (content === 'edit'){
      this.modalTitle="EDITANDO USUARIO"
      this.usuarioAEditar = usuario? { ...usuario} : null
      console.log('Usuario a editar:', this.usuarioAEditar); 
      
    }else if (content ==="delete"){
      this.modalTitle="ELIMINANDO USUARIO"
      this.modalContent==="SE HA QUEDADO BUENA LA TARDE, Pero seguro vas a eliminar este Usuario??"
    }else if (content=== "crear") {
      this.modalTitle= "CREANDO USUARIO"
      this.modalContent=""
    }
  }

  /* METODO PARA MOSTRAR-OCULTAR LOS ELEMENTOS */
 /*  mostrarCrear() {
    this.mostrar = !this.mostrar;
  } */
}
