import { Component, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NotFoundComponent } from './error/not-found-404/not-found.component';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FlavouryStock';

  currentHeader = signal('usuario-header'); 
  showLayout = signal(true)

  constructor(private router: Router) {
    this.changeHeader()
    router.events.pipe(
    filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {

    const isErrorRoutes = this.router.routerState.snapshot.root.firstChild?.component === NotFoundComponent
    this.showLayout.set(!isErrorRoutes)
    })
  }

  ngOnInit(): void {
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
