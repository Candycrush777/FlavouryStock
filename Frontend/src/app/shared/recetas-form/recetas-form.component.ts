import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service'; 

@Component({
  selector: 'app-recetas-form',
  standalone: false,
  templateUrl: './recetas-form.component.html',
  styleUrl: './recetas-form.component.css'
})
export class RecetasFormComponent {

  recipeForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private recipeService: RecipeService
  ) {
    this.recipeForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      tiempo_preparacion: [0],
      categoria: [''],
      estacion: [''],
      imagen: ['']
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.recipeService.registerRecipe(this.recipeForm.value).subscribe({
        next: (res) => {
          alert(res.message); // Muestra el mensaje de éxito, hay que mirar que poner
          console.log('ID de la nueva receta:', res.id); 
        },
        error: (err) => {
          console.error('Error al crear la receta:', err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }





}
