import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = {
    id_rol: 0,
    id_usuario: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    empresa: '',
    email: '',
    passwd: '',
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    /* console.log('Intentando login con usuario:', this.user); */
    
    if (!this.user.email || !this.user.passwd) {
      console.log('Email o contraseña vacíos');
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Correo electrónico o contraseña estan vacios",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    this.userService.login(this.user).subscribe({
      next: (response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Inicio de sesión correctamente",
          showConfirmButton: false,
          timer: 1500
        });

        localStorage.setItem('token', response.token)
        localStorage.setItem("id_rol", response.id_rol.toString())
        // Aquí puedes redirigir según el rol
        if (response.id_rol === 1) {
          this.router.navigate(['/inicio-admin']);
          
        } else {
          this.router.navigate(['/usuario']);
        }
      },
      error: (error) => {
        console.error('Error en el login:', error);
      }
    });
  }
}
