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
  users:User[]= []

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getUsers()//llamamos a la funcion al iniciar el componente
  }

  getUsers(){
    console.log('Intentando obtener usuarios...SE MUESTRA');
    this.userService.getAllUser().subscribe(user=>{
      this.users = user
    },error=>{
      console.log("Error obtenido en usuarios",error);
      
    })
  }

  vistaTabla = true;
  mostrar = false;
  editarUser: Number | null = null

  /* ESTA LISTA ES LA FICTICIA */
  /* listaUsers: User[] = [
    {
      id_user: 1,
      id_rol: 1,
      nombre: 'Vinicius',
      apellido1: 'Junior',
      apellido2: '',
      empresa: 'RMadrid',
      email: 'viniChef@mail.com',
      passwd: '12345678',
    },
    {
      id_user: 2,
      id_rol: 2,
      nombre: 'Rosendo',
      apellido1: 'Mercado',
      apellido2: '',
      empresa: 'Rock&Roll',
      email: 'rosenCocina@mail.com',
      passwd: '12345678',
    },
    {
      id_user: 3,
      id_rol: 2,
      nombre: 'Fito',
      apellido1: 'Cabrales',
      apellido2: '',
      empresa: 'Musica',
      email: 'fitoCocina@mail.com',
      passwd: '12345678',
    },
    {
      id_user: 4,
      id_rol: 2,
      nombre: 'Antoine',
      apellido1: 'Griezmann',
      apellido2: '',
      empresa: 'AtMadrid',
      email: 'grizzCocina@mail.com',
      passwd: '12345678',
    },
  ]; */

/*   idRolUser = -1;
  nombreUser = '';
  apellido1User = '';
  apellido2User = '';
  empresaUser = '';
  emailUser = '';
  passwdUser = ''; */

 openModal(user: User){

 }

  /* METODO PARA MOSTRAR-OCULTAR LOS ELEMENTOS */
  mostrarCrear() {
    this.mostrar = !this.mostrar;
  }
 
}
