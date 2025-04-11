import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Recipe,
  RecipeResponse,
  RecipeCreationResponse,
  ApiResponse,
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
  registerRecipe(recipe: Recipe): Observable<RecipeCreationResponse> {
    return this.http
      .post<RecipeCreationResponse>(`${this.api}`, recipe)
      .pipe(map((res) => res));
  }

  //GET

  getRecipeById(id: number): Observable<ApiResponse<Recipe>> {
    return this.http.get<ApiResponse<Recipe>>(
      `${this.api}/getRecipeById/${id}`
    );
  }

  //PUT

  updateRecipe(id: number, recipe: Partial<Recipe>): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.api}/updateRecipe/${id}`, recipe);
  }

  //DELETE

  deleteRecipe(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.api}/deleteRecipe/${id}`);
  }
}
