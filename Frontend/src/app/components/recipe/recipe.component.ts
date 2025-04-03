import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipes';
import { RecipeService } from '../../services/recipe.service';
import { error } from 'console';

@Component({
  selector: 'app-recipe',
  standalone: false,
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {

  recipes: Recipe[] = []

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

}
