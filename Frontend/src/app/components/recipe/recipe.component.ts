import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeViewDetail } from '../../models/recipes';
import { RecipeService } from '../../services/recipe.service';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe',
  standalone: false,
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {
  allRecipes: Recipe[] = []
  recipes: Recipe[] = []
  currentPage: number = 1
  selectedRecipe: RecipeViewDetail | null = null
  ingredienteList: string[] = []
  pasosList: string[] = []
  currentCategory: string = ''

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    this.getRecipes()//llamamos a la funcion al iniciar el componente
  }

  getRecipes(){
    this.recipeService.getAllRecipes().subscribe(recipe => {
      this.recipes = recipe
      this.allRecipes = recipe
    },error => {
      console.error('error obteniendo recetas', error);
      
    })
  }

  loadMoreRecipes(page: number){
    this.recipeService.loadPage(page).pipe(
      filter(recipe => recipe.length > 1)
    ).subscribe(recipes => {
      this.currentPage = page
      this.recipes = recipes
      this.allRecipes = recipes
    })
  }

  loadPreviesRecipe(){
    if (this.currentPage > 1) {
      this.currentPage--
      this.recipeService.loadPage(this.currentPage).subscribe(recipe =>{
        this.recipes = recipe
      })
    }
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

  filterByCategory(category: string){
    if (this.currentCategory === category) {
      this.allRecipes = this.recipes
      this.currentCategory = ''
    }else{
      this.currentCategory = category
      this.allRecipes = this.recipes.filter(
        receta => receta.categoria.toLowerCase() === category.toLowerCase()
      )

      if (this.allRecipes.length === 0) {
        Swal.fire({
          title: '!No hay recetas!',
          text: `No hay recetas disponibles para la categoria ${category} en esta página. Por favor prueba con otra.`,
          icon: 'info',
          confirmButtonText: 'Cerrar'
        })
      }
    }

  }

}
