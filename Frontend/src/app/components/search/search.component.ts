import { Component } from '@angular/core';
import { Recipe, RecipeViewDetail } from '../../models/recipes';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  nombre = ""
  recipes: Recipe[] = []
  noRecipe = ""

  selectedRecipe: RecipeViewDetail | null = null;
  ingredienteList: string[] = [];
  pasosList: string[] = [];

  constructor(private recipeService: RecipeService, private activatedRoutes: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoutes.params.subscribe(params => {
      this.nombre = params['nombre']
      console.log(this.nombre);

      this.recipeService.searchRecipe(this.nombre).subscribe(recipe => {
        this.recipes = recipe

        if (recipe.length === 0) {
          this.noRecipe = 'No se encontro ninguna receta con ese nombre.'
        }
      })
      
    })
    
  }

  viewDetail(recipe: Recipe){
    this.recipeService.getRecipeById(recipe.id_receta).subscribe(
      (detailRecipe) =>{
        this.selectedRecipe = detailRecipe
        this.ingredienteList = this.parseIngredientes(detailRecipe.ingredientes_formato)
        this.pasosList = this.parsePaso(detailRecipe.receta_paso_paso)
      }, (error) => {
        console.log('Error al obtener detaller de la receta', error);
        
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
