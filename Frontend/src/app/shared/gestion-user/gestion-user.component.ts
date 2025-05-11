import { Component, OnInit} from '@angular/core';
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
  usersList?: User[]
  user?: User
  modalTitle=""
  modalContent=""
  usuarioAEditar: User | null = null
  usuarioAEliminar: User | null = null
  mostrarModal = false

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers(); 
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
      
      this.userService.UpdateUserById(this.usuarioAEditar.id_usuario!, this.usuarioAEditar).subscribe({
        next: (response) =>{
          console.log('Comprobar Usuario modificado correctamente', response);
          this.getUsers()     
          this.closeModal(this.usuarioAEditar!)
          
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

    Swal.fire({
      title: "¿Estás seguro de eliminar el usuario?",
      text: "Esta acción no tiene vuelta atrás",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: `No, mantener`,
      confirmButtonColor: '#000000B3',
      cancelButtonColor: '#888888B3',
      
      didOpen: () => {

        const addHoverEffects = (button: HTMLElement, originalColor: string) => {
        
          button.style.transition = '0.15s ease-in-out';
    
          button.addEventListener('mouseenter', () => {
          
            button.style.backgroundColor = 'rgba(237, 117, 87, 0.645)';
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
          });
          button.addEventListener('mouseleave', () => {
          
            button.style.backgroundColor = "#000000B3";
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
      }

      
    }).then((result) => {
    
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
    this.usuarioAEditar= null
    this.usuarioAEliminar= null


    if (content === 'edit'){
      this.modalTitle="EDITANDO USUARIO"
      this.modalContent=""
      this.usuarioAEditar = usuario? { ...usuario} : null
      //console.log('Usuario a editar:', this.usuarioAEditar); 
      
      
    }else if (content=== "crear") {
      this.modalTitle= "CREANDO USUARIO"
      this.modalContent=""
    }
  
  }

  closeModal(user:User){

    this.mostrarModal = false;
    this.usuarioAEditar = null;
    this.usuarioAEliminar = null;
    this.modalTitle = "CONFIRMACIÓN";
    this.modalContent = ` El usuario ${user.nombre} ${user.apellido1}, ha sido editado con exito`; 

  }
  


 
}
