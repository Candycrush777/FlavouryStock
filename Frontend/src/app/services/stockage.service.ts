import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteResponse, RegisterBasketPayload, RegisterResponse, Stockage, StockageView } from '../models/stockageView';
import { log } from 'console';
// Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class StockageService {
  private apiUrl = 'http://localhost:3000/api/stockage'; //poner la otra api conectandome a ingrdredientes
  private api = 'http://localhost:3000/api/ingredients'; 

  constructor(private http: HttpClient) {}

  getAllStockages(): Observable<StockageView[]> {
    return this.http.get<StockageView[]>(`${this.apiUrl}/getAllStockage`);
  }

  updateStockage(
    idIngrediente: number,
    stockData: Partial<Stockage>
  ): Observable<Stockage> {
    const url = `${this.apiUrl}/updateStockage/${idIngrediente}`;
    console.log('URL de PATCH para actualizar stock:', url);
    return this.http.patch<Stockage>(url, stockData);
  }

  clearStocage(
    idIngrediente: number,
    stockData: Partial<Stockage>
  ): Observable<Stockage> {
    const url = `${this.apiUrl}/clearStockage/${idIngrediente}`;

    console.log('URL de PATCH para resetar stock:', url);

    return this.http.patch<Stockage>(url, stockData);
  }

  registerBasket(data: RegisterBasketPayload): Observable<RegisterResponse> {
    const url = `${this.api}/registerBasket`;
    console.log('URL de POST para registrar la compra:', url);
    return this.http.post<RegisterResponse>(url, data);
  }

  
  buscarStockage(busqueda: string): Observable<StockageView[]> {
    return this.http.get<StockageView[]>(`${this.apiUrl}/buscarStockage`, {
      params: { busqueda: busqueda },
    });
  }

  deleteIngredientById(id: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(
      `${this.apiUrl}/deleteIngredientById/${id}`
    );
  }
}
