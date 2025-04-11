import { Component, OnInit } from '@angular/core';
import { ApiResponse, Recipe } from '../../models/recipes';
import { RecipeService } from '../../services/recipe.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-recipe',
  standalone: false,
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {

  recipes: Recipe[] = []
  currentPage: number = 1
  selectedRecipe: Recipe | null = null;
  isUpdated: boolean = false;

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    this.getRecipes()//llamamos a la funcion al iniciar el componente
  }

  getRecipes(){
    this.recipeService.getAllRecipes().subscribe(recipe => {
      this.recipes = recipe
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

  getRecipeById(id: number) {
    this.recipeService.getRecipeById(id).subscribe({
      next: (response: ApiResponse<Recipe>) => {
        if (response.data) {
          this.selectedRecipe = response.data;
        }
      },
      error: (err) => {
        console.error('Error al obtener la receta por ID', err);
      }
    });
  }

  updateRecipe() {
    if (this.selectedRecipe) {
      const updatedRecipe = { ...this.selectedRecipe }; 
      this.recipeService.updateRecipe(updatedRecipe.id_receta, updatedRecipe).subscribe({
        next: (response: ApiResponse) => {
          if (response.message) {
            alert('Receta actualizada correctamente');
            this.isUpdated = true;
            this.getRecipes();  // Actualizamos la lista de recetas
          }
        },
        error: (err) => {
          console.error('Error actualizando la receta', err);
        }
      });
    }
  }

  deleteRecipe() {
    if (this.selectedRecipe) {
      this.recipeService.deleteRecipe(this.selectedRecipe.id_receta).subscribe({
        next: (response: ApiResponse) => {
          if (response.message) {
            alert('Receta eliminada correctamente');
            this.selectedRecipe = null;  // Quitamos la receta seleccionada
            this.getRecipes();  
          }
        },
        error: (err) => {
          console.error('Error eliminando la receta', err);
        }
      });
    }
  }

}
