import { Component,EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario-header',
  standalone: false,
  templateUrl: './usuario-header.component.html',
  styleUrl: './usuario-header.component.css'
})
export class UsuarioHeaderComponent {
  @Output() onLogOut = new EventEmitter<void>()

  constructor(private userService: UserService, private router: Router){}

  logOut(){
    this.userService.logOut();
    this.onLogOut.emit()
  }

}
