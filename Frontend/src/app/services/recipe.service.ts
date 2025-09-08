import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Recipe,
  RecipeResponse,
  RecipeViewDetail,
  RecipeArray,
  RecipeCategoriaPorcentaje,
  RecipeEstacionPorcentaje,
} from '../models/recipes';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private api = 'http://localhost:3000/api/recipes';

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<RecipeResponse>(`${this.api}/getRecipes?page=1`).pipe(
      map((res) => {
        /* console.log('Respuesta de la api: ', res); */
        return res.recetas;
      })
    );
  }
  getAllRecipesList(): Observable<Recipe[]> {
    return this.http.get<RecipeResponse>(`${this.api}/getRecipesList`).pipe(
      map((res) => {
        /* console.log('Respuesta de la api: ', res); */
        return res.recetas;
      })
    );
  }

  loadPage(page: number): Observable<Recipe[]> {
    return this.http
      .get<RecipeResponse>(`${this.api}/getRecipes?page=${page}`)
      .pipe(map((result) => result.recetas));
  }

  //POST
  registerRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.api}/registerRecipe`, recipe);
  }

  searchRecipe(nombre: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.api}/search?nombre=${nombre}`);
  }

  //GET

  getRecipeById(id: number): Observable<RecipeViewDetail> {
    return this.http.get<RecipeViewDetail>(`${this.api}/getRecipeById/${id}`);
  }

  getRecipeByIdIngrediente(id: number): Observable<Recipe[]> {
    return this.http
      .get<RecipeArray>(`${this.api}/getRecipesByIdIngredient/${id}`)
      .pipe(
        map((res) => {
          /*  console.log("Respuesta de la Api: en recipeByIngred", res) */
          return res.result;
        })
      );
  }
  //PATCH

  updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    return this.http.patch<Recipe>(`${this.api}/updateRecipe/${id}`, recipe);
  }

  //DELETE

  deleteRecipe(id: number): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.api}/deleteRecipe/${id}`);
  }

  getRecipePorcentajes(): Observable<RecipeCategoriaPorcentaje[]> {
    return this.http.get<RecipeCategoriaPorcentaje[]>(`${this.api}/porcentajes`);
  }

  getEstacionesPorcentaje():Observable<RecipeEstacionPorcentaje[]>{

    return this.http.get<RecipeEstacionPorcentaje[]>(`${this.api}/porcentajesEstacion`)
  }
}
