import { Component, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FlavouryStock';

  currentHeader = signal('inicio'); // Usa signals en lugar de variables reactivas tradicionales

  constructor(private router: Router) {
    router.events.pipe(
    filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
    this.changeHeader()
    })
  }

  ngOnInit(): void {
    this.changeHeader()
    
  }

  changeHeader(){
    const user = typeof window !== 'undefined' ? localStorage.getItem('id_rol') : null //esto es para chequear que localStorage este disponible
    if (user === '1' || user === '2') {
      this.currentHeader.set('usuario-header');
    }  else {
      this.currentHeader.set('inicio');
    } 
  }
  onLogOut(){
    localStorage.clear()
    this.currentHeader.set('inicio')
    this.router.navigate(['/login'])
  }

}
