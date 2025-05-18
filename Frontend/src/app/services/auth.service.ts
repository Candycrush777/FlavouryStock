// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN_KEY = 'token';
  private ROLE_KEY  = 'id_rol';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setSession(token: string, role: number) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.ROLE_KEY, role.toString());
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.ROLE_KEY);
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): number {
    if (!isPlatformBrowser(this.platformId)) {
      return NaN;
    }
    return Number(localStorage.getItem(this.ROLE_KEY));
  }

  getToken(): string | null {
  return isPlatformBrowser(this.platformId)
    ? localStorage.getItem(this.TOKEN_KEY)
    : null;
}
}

