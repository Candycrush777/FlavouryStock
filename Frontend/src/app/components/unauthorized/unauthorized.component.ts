import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  standalone: false,
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css',
})
export class UnauthorizedComponent implements OnInit {
  show = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      
      setTimeout(() => (this.show = true), 100);
    }
    /* console.log('🚫 UnauthorizedComponent rendered'); */
  }

  goHome() {
    this.router.navigate(['/inicio']);
  }
}
