import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service'; 
import { Recipe } from '../../models/recipes';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recetas-form',
  standalone: false,
  templateUrl: './recetas-form.component.html',
  styleUrl: './recetas-form.component.css'
})
export class RecetasFormComponent {

  recipes: Recipe = {
  id_receta: 0, // se ignora al insertar normalmente
  nombre: '',
  imagen: null,
  descripcion: '',
  paso_paso: '',
  tiempo_preparacion: 0,
  categoria: '',
  estacion: ''
  }


  constructor(private recipeService: RecipeService, public router:Router) {}


  registerRecipe(){
    this.recipeService.registerRecipe(this.recipes).subscribe({
      next: (response) =>{
        console.log("Receta Agregada correctamente", response)
        this.recipeService.getAllRecipesList();
        this.recipes = response;
        

      },
      error: (error) =>{
        console.log("la receta es:", this.recipes.nombre);
        
      console.log("Error al crear receta", error);
      }
    })
  
  }

}
