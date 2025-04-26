import { Component,EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'


@Component({
  selector: 'app-usuario-header',
  standalone: false,
  templateUrl: './usuario-header.component.html',
  styleUrl: './usuario-header.component.css'
})
export class UsuarioHeaderComponent {
  @Output() onLogOut = new EventEmitter<void>()

  constructor(private userService: UserService, private router: Router, private location:Location){}

  logOut(){
    this.userService.logOut();
    this.onLogOut.emit()
  }

  searchRecipe(nombre: string) {
    nombre = nombre.trim()
    if (nombre.length === 0) {
      return
    }

    this.router.navigate(['/search', nombre])
  }

  volver(): void{
    this.location.back();
  }

}
