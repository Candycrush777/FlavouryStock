import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordVisible: boolean = false;
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
    private authService: AuthService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    
  }

  showPassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    
    if (!this.user.email || !this.user.passwd) {
  
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Correo electrónico o contraseña están vacíos",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    

    this.userService.login(this.user).subscribe({
      next: (response) => {
       
        // Verifica que token e id_rol existan en la respuesta:
        if (!response.token || !response.id_rol) {
        
          Swal.fire({
            icon: "error",
            title: "Respuesta inválida del servidor",
            showConfirmButton: false,
            timer: 1500
          });
          return;
        }

        this.authService.setSession(response.token, response.id_rol);
       

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Inicio de sesión correcto",
          showConfirmButton: false,
          timer: 1000
        });

        setTimeout(() => {
          if (response.id_rol === 1) {
            this.router.navigate(['/inicio-admin']);
          } else {
            this.router.navigate(['/usuario']);
          }
        }, 1000);
      },
      error: (error) => {
        console.error('Error en el login:', error);  // <<-- Mostrar error backend
        Swal.fire({
          icon: "error",
          title: "Correo electrónico o contraseña incorrectos",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
}

