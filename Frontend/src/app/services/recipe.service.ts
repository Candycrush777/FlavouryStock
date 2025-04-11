import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recipe, RecipeResponse } from '../models/recipes';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private api = 'http://localhost:3000/api/recipes';

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<RecipeResponse>(`${this.api}/getRecipes?page=1`).pipe(
      map((res) => {
        console.log('Respuesta de la api: ', res);
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
    return this.http.post<Recipe>(`${this.api}/registerRecipe`, recipe)
  }

  //GET

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(
      `${this.api}/getRecipeById/${id}`
    );
  }

  //PATCH

  updateRecipe(id: number, recipe: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.api}/updateRecipe/${id}`, recipe);
  }

  //DELETE

  deleteRecipe(id: number): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.api}/deleteRecipe/${id}`);
  }
}
