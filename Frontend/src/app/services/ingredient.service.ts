import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IngredientsPorcentaje } from '../models/ingredients';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private api = 'http://localhost:3000/api/ingredients';
  constructor(private http: HttpClient) {}

  getObtenerOcupacionPorcentajes(): Observable<IngredientsPorcentaje[]> {
    return this.http.get<IngredientsPorcentaje[]>(
      `${this.api}/obtenerOcupacion`
    );
  }
}
