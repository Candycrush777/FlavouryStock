import { AfterViewInit, Component, Inject, Input, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { Recipe } from '../../models/recipes';
import { Etiqueta } from '../../models/etiqueta';
import Swiper from 'swiper'
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-slide-recipes',
  standalone: false,
  templateUrl: './slide-recipes.component.html',
  styleUrl: './slide-recipes.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SlideRecipesComponent implements AfterViewInit {

  mySwiper?: Swiper;
  @Input() recipes?: Recipe[] 
  @Input() caducidadesList?: Etiqueta[]

  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
        this.mySwiper = new Swiper('.swiper', {
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        })
    }
  }

  onSlideNext(){
    this.mySwiper?.slideNext()
  }

  onSlidePreview(){
    this.mySwiper?.slidePrev()
  }

}
