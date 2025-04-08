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
  mostrarModal = false

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
          this.closeModal()
          this.getUsers()// Para actualizar los cambios
          //todo falta limpiar los campos del edit
        },
        error: (error) => {
          console.log('Error al editar usuario', error)
          Swal.fire('Error', 'No se pudo actualizar el usuario', 'error')
        }
      })
    }
  }

  deleteUser(){
    
    console.log('Usuario a Eliminar:', this.UsuarioAEliminar); 

    //Swal de confirmacion
    Swal.fire({
      title: "¿Estás seguro de eliminar el usuario?",
      text: "Esta acción no tiene vuelta atrás",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Me lo he pensado mejor`
    }).then((result) => {
      //dentro del confirmar meto la funcion EJECUTORA
      if (result.isConfirmed) {
        if (this.UsuarioAEliminar) {
          this.userService.deleteUserById(this.UsuarioAEliminar.id_usuario!).subscribe({
            next: (response)=>{
              console.log("USER ELIM", response);
              
              Swal.fire("Usuario eliminado con exito", "","success")
              this.closeModal()
              this.getUsers()
            }, error: (error)=>{
              console.log('Error al editar usuario', error)
              Swal.fire('Error', 'No se pudo Eliminar el usuario', 'error')
            }
          })
        }
      } else if (result.isDenied) {
        Swal.fire("El usuario no ha sido eliminado", "", "info");
      }
    });

    /* if (this.UsuarioAEliminar) {
      this.userService.deleteUserById(this.UsuarioAEliminar.id_usuario!).subscribe({
        next: (response)=>{
          console.log('Usuario a Eliminar:', this.UsuarioAEliminar); 
          Swal.fire("Usuario eliminado con exito", "","success")
          this.getUsers()
        }, error: (error)=>{
          console.log('Error al editar usuario', error)
          Swal.fire('Error', 'No se pudo Eliminar el usuario', 'error')
        }
      })
    } */

  }





  openModal(content: string, usuario?:User ) {
    this.mostrarModal = true;
    //reseteo de users
    this.usuarioAEditar= null
    this.UsuarioAEliminar= null


    if (content === 'edit'){
      this.modalTitle="EDITANDO USUARIO"
      this.usuarioAEditar = usuario? { ...usuario} : null
      console.log('Usuario a editar:', this.usuarioAEditar); 
      
    }else if (content=== "crear") {
      this.modalTitle= "CREANDO USUARIO"
      this.modalContent=""
    }
    
    /* else if (content ==="delete"){
      this.modalTitle="ELIMINANDO USUARIO"
      this.modalContent==="SE HA QUEDADO BUENA LA TARDE, Pero seguro vas a eliminar este Usuario??"
    } */
  }

  closeModal(){
    this.mostrarModal = false;
    this.usuarioAEditar = null;
    this.UsuarioAEliminar = null;
    this.modalTitle = ""; // Resetear el título del modal
  }

 
}
