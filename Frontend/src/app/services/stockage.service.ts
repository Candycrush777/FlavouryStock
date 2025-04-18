import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockageResponse, StockageView } from '../models/stockageView';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockageService {

  private apiUrl = 'http://localhost:3000/api/stockage'; 

 constructor(private http: HttpClient) { }


 getAllStockages(): Observable<StockageView[]> {
  return this.http.get<StockageView[]>(`${this.apiUrl}/getAllStockage`);
}
}
