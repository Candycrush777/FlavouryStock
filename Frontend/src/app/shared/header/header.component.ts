import { isPlatformBrowser, Location } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedIn: boolean | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private location: Location) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkLogin();
    }
  }

  checkLogin(): void {
    const user = localStorage.getItem('token');
    this.isLoggedIn = !!user;
  }

  volver(): void{
    this.location.back();
  }
}
