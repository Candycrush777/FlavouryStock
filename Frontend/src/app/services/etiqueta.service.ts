import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Etiqueta } from '../models/etiqueta'
import { Observable, catchError, tap, map } from 'rxjs'
import { EtiquetaResponse } from './../models/etiqueta'

@Injectable({
  providedIn: 'root',
})
export class EtiquetaService {
  private api = 'http://localhost:3000/api/etiquetas'
  constructor(private http: HttpClient) {}

  getAllEtiquetas(): Observable<Etiqueta[]> {
    return this.http.get<EtiquetaResponse>(`${this.api}/getEtiquetas`).pipe(
      map((res) => {
        console.log('respuesta Api getAllEtiquetas', res)
        return res.result
      })
    );
  }

  getCaducaPronto(): Observable<Etiqueta[]> {
    return this.http.get<EtiquetaResponse>(`${this.api}/getCaducaP`).pipe(
      map((res) => {
        console.log('respuesta Api getCaducaP en service', res)
        return res.result
      })
    );
  }

  getCaducaMuyPronto():Observable<Etiqueta[]> {
    return this.http.get<EtiquetaResponse>(`${this.api}/getCaducaMP`).pipe(
      map((res) => {
        console.log('respuesta Api getCaducaMP en service', res)
        return res.result
      })
    );
  }

  getCaducado():Observable<Etiqueta[]> {
    return this.http.get<EtiquetaResponse>(`${this.api}/getCaducado`).pipe(
      map((res) => {
        console.log('Respuesta Api getCaducado en service', res)
        return res.result
      })
    )
  }

  getRecetasPos():Observable<Etiqueta[]> {
    return this.http.get<EtiquetaResponse>(`${this.api}/getPosibleRecipe`).pipe(
      map((res) => {
        console.log('respuesta api en getPosibleRecipe en service', res)
        return res.result
      })
    )
  }
  getRecetasPosId(idIngred:number):Observable<Etiqueta[]> {
    return this.http.get<EtiquetaResponse>(`${this.api}/getPosibleRecipeId/${idIngred}`).pipe(
      map((res) => {
        console.log('respuesta api en getPosibleRecipe en service', res)
        return res.result
      })
    )
  }


}
