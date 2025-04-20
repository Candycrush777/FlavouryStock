import { AfterViewInit, Component, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { Recipe, RecipeViewDetail } from '../../models/recipes';
import { Etiqueta } from '../../models/etiqueta';
import Swiper from 'swiper'
import { isPlatformBrowser } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';


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
  selectedRecpe: RecipeViewDetail | null = null
  ingredienteList: string[] = []
  pasosList: string[] = []
  @Output() showDetail = new EventEmitter<Recipe>()

  imagenDefecto = "/defaultImage.jpg"


  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.mySwiper = new Swiper('.swiper', {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        });
      }, 0); 
    }
  }

  onSlideNext(){
    this.mySwiper?.slideNext()
  }

  onSlidePreview(){
    this.mySwiper?.slidePrev()
  }

  viewDetail(recipe: Recipe){
    this.showDetail.emit(recipe);
  }
}
