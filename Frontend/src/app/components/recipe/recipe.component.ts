import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipes';
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

  

}
