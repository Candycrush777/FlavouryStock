import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

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
      return;
    }

    this.userService.login(this.user).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        console.log('Rol recibido:', response.id_rol);
        
        
        
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
