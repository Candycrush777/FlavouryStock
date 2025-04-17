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


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private recipeService: RecipeService){}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
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
    this.recipeService.getRecipeById(recipe.id_receta).subscribe(
      (detailRecipe) => {
        console.log('Detalle desde el slide', detailRecipe);
        this.selectedRecpe = detailRecipe
        this.ingredienteList = this.parseIngredientes(detailRecipe.ingredientes_formato)
        this.pasosList = this.parsePaso(detailRecipe.receta_paso_paso)
        
      }, (error) => {
        console.error('Error al obtener detalles de la receta desde el slide', error)
      }
    )
  }

  parseIngredientes(ingredientes: string): string[]{
    return ingredientes
    .split(' , ')
    .map(item => item.replace(/[\[\]]/g, ''));
  }

  parsePaso(pasos: string): string[]{
    return pasos.split(/\s(?=\d+\.)/)
  }


}
