// src/app/guards/auth.guard.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // 1) Si no estamos en el navegador (SSR o hidración), permitimos navegar
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    // 2) Ahora sí estamos en el cliente: hacemos la comprobación real
    if (!this.auth.isLoggedIn()) {
      
   /*  console.log("un canActivate", this.auth.isLoggedIn()); */
      this.router.navigate(['/unauthorized']);
      return false;
    }

    // 3) Comprobamos roles (solo en rutas que lo tengan definido)
    const roles = route.data['roles'] as number[] | undefined;
    if (roles) {
      const userRole = this.auth.getRole();
      if (!roles.includes(userRole)) {
        this.router.navigate(['/usuario']);
        return false;
      }
    }
  
    return true;
  }
}


