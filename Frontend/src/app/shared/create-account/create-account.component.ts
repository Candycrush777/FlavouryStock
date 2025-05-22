import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-account',
  standalone: false,
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  confirmPassword: string = '';
  passwordErrors: string[] = [];
  passwordsMatch: boolean = true;

  passwordVisible: boolean = false;
  confirmPassVisible: boolean = false;
  
  confirmCheched:boolean=false;

  user: User ={
    id_rol: 1, // Por defecto será usuario ser admin
    id_usuario: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    empresa: '',
    email: '',
    passwd: '',
  };

  constructor(
    private userService: UserService,
    public router: Router
  ) {}

 
  showPassword(){
    this.passwordVisible = !this.passwordVisible;
  }
  confirmShowPassword(){
    this.confirmPassVisible = !this.confirmPassVisible
  }

  validatePassword() {
    this.passwordErrors = [];
    const password = this.user.passwd;

    if (password.length < 8) {
      this.passwordErrors.push('La contraseña debe tener al menos 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      this.passwordErrors.push('Debe contener al menos una mayúscula');
    }
    if (!/[0-9]/.test(password)) {
      this.passwordErrors.push('Debe contener al menos un número');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      this.passwordErrors.push('Debe contener al menos un símbolo');
    }

    // Verificar si las contraseñas coinciden
    this.passwordsMatch = this.user.passwd === this.confirmPassword;
    if (!this.passwordsMatch) {
      this.passwordErrors.push('Las contraseñas no coinciden');
    }

    return this.passwordErrors.length === 0 && this.passwordsMatch;
  }

  crearCuenta() {

    if (!this.confirmCheched) {

          Swal.fire({
              position: "center",
              icon: "warning",
              title: "Por favor, acepte los terminos y condiciones",
              showConfirmButton: false,
              timer: 1500
            });
      return;
    }

    if (!this.user.nombre || !this.user.apellido1 || !this.user.apellido2 || !this.user.empresa || !this.user.email || !this.user.passwd ) {
      Swal.fire({
              position: "center",
              icon: "warning",
              title: "Por favor, rellene todos los campos",
              showConfirmButton: false,
              timer: 1500
            });
      return;
    }

    this.userService.createUser(this.user).subscribe({
      next: (response) => {
       /*  console.log('Usuario creado exitosamente:', response.id_rol); */
        Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario creado exitosamente",
                showConfirmButton: false,
                timer: 1500
              });
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al crear usuario",
                showConfirmButton: false,
                timer: 1500
              });
      }
    });
    this.clearUser();
  }
  
  clearUser(){
    this.user = {
      id_rol: 1, // Reiniciamos también el id_rol al valor por defecto
      id_usuario:0,
      nombre: '',
      apellido1: '',
      apellido2: '',
      empresa: '',
      email: '',
      passwd: '',
    }
    this.confirmPassword = ''
    this.passwordErrors = [];
    this.passwordsMatch = true;
  }
}
