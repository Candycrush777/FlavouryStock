import { Component, OnInit} from '@angular/core';
import { User } from './../../models/user';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { response } from 'express';
import { Modal } from 'bootstrap';



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
  usuarioAEliminar: User | null = null//para delete
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

  /* editUser2(){//todo con SWAL
    if (this.usuarioAEditar) {
      
      this.userService.UpdateUserById(this.usuarioAEditar.id_usuario!, this.usuarioAEditar).subscribe({
        next: (response) =>{
          console.log('Comprobar Usuario modificado correctamente', response);
          this.getUsers()// Para actualizar los cambios
          Swal.fire({
            title: "Usuario actualizado correctamente",  
            icon: "success",
            timer:2000,
            
          })
          
          //this.closeModal()
          
          //todo falta limpiar los campos del edit
        },
        error: (error) => {
          console.log('Error al editar usuario', error)
          Swal.fire('Error', 'No se pudo actualizar el usuario', 'error')
        }
      })
    }
  } */
  
    editUser(){//todo sin SWAL
    if (this.usuarioAEditar) {
      
      this.userService.UpdateUserById(this.usuarioAEditar.id_usuario!/* asercion */, this.usuarioAEditar).subscribe({
        next: (response) =>{
          console.log('Comprobar Usuario modificado correctamente', response);
          this.getUsers()// Para actualizar los cambios      
          this.closeModal(this.usuarioAEditar!)
          
          //todo falta limpiar los campos del edit
        },
        error: (error) => {
          console.log('Error al editar usuario', error)
          Swal.fire('Error', 'No se pudo actualizar el usuario', 'error')
        }
      })
    }
  }
 
  deleteUser(idUser:number){
    
    console.log('Usuario a Eliminar:', idUser); 

    //Swal de confirmacion
    Swal.fire({
      title: "¿Estás seguro de eliminar el usuario?",
      text: "Esta acción no tiene vuelta atrás",
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: `No, mantener`,
      confirmButtonColor: '#000000B3',
      cancelButtonColor: '#888888B3',
      
      didOpen: () => {

        const addHoverEffects = (button: HTMLElement, originalColor: string) => {
          // Transición para suavizar el cambio de estilo
          button.style.transition = '0.15s ease-in-out';
    
          button.addEventListener('mouseenter', () => {
            // Aplica color de hover y sombra cuando el cursor entra
            button.style.backgroundColor = 'rgba(237, 117, 87, 0.645)';
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
          });
          button.addEventListener('mouseleave', () => {
            // Restaura el color original y elimina la sombra cuando el cursor sale
            button.style.backgroundColor = "#000000B3";
            button.style.boxShadow = 'none';
          });
        };

        
        // Obtiene el botón de confirmación y aplica border-radius
        const confirmBtn = Swal.getConfirmButton();
        if (confirmBtn) {
          confirmBtn.style.borderRadius = '10px'; // Cambia este valor según lo necesario
          addHoverEffects(confirmBtn, '#3085d6');
        }
        // Obtiene el botón de denegación y aplica border-radius
        const cancelBtn = Swal.getCancelButton();
        if (cancelBtn) {
          cancelBtn.style.borderRadius = '10px';
          addHoverEffects(cancelBtn, '#3085d6');
        }
      }

      
    }).then((result) => {
      //dentro del confirmar meto la funcion EJECUTORA
      if (result.isConfirmed) {
        if (idUser) {
          this.userService.deleteUserById(idUser!).subscribe({
            next: (response)=>{
              console.log("USER ELIM", response);
              
              Swal.fire("Usuario eliminado con exito", "","success")
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

  }





  openModal(content: string, usuario?:User ) {
    this.mostrarModal = true;
    //reseteo de users
    this.usuarioAEditar= null
    this.usuarioAEliminar= null


    if (content === 'edit'){
      this.modalTitle="EDITANDO USUARIO"
      this.usuarioAEditar = usuario? { ...usuario} : null
      console.log('Usuario a editar:', this.usuarioAEditar); 
      
      
    }else if (content=== "crear") {
      this.modalTitle= "CREANDO USUARIO"
      this.modalContent=""
    }
  
  }

  closeModal(user:User){

    this.mostrarModal = false;
    this.usuarioAEditar = null;
    this.usuarioAEliminar = null;
    this.modalTitle = "CONFIRMACIÓN"; // Resetear el título del modal
    this.modalContent = ` El usuario ${user.nombre} ${user.apellido1}, ha sido editado con exito`; 

  }
  


 
}
