import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recipe, RecipeResponse } from '../models/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private api = 'http://localhost:3000/api/recipes'; 

  constructor(private http: HttpClient) { }

  getAllRecipes():Observable<Recipe[]>{
    return this.http.get<RecipeResponse>(`${this.api}/getRecipes`).pipe(
      map((res) => {
        console.log('Respuesta de la api: ', res);
        return res.result
      })
    )
  }
}
