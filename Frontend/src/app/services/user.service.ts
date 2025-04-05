import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, map } from 'rxjs';
import { LoginResponse, User, UserResponse } from '../models/user';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api/users'; 
    private apiGet = 'http://localhost:3000/api/getUsers'; 
    

    constructor(private http: HttpClient) { }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, user);
    }

    login(user: User): Observable<LoginResponse> {

        const loginData = {
            email: user.email,
            passwd: user.passwd
        };
        console.log('Datos enviados al login:', loginData);
        console.log('¿Email está vacío?', !loginData.email);
        console.log('¿Passwd está vacío?', !loginData.passwd); 
        
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData).pipe(
            tap((response) => {
                console.log('Respuesta completa', response);
                
                
            }),
            catchError(error => {
                console.log('Error completo:', error);
                console.log('Mensaje del backend:', error.error);
                throw error;
            })
        ); 
    }

    getAllUser():Observable<User[]>{
/*  BUSCANDO EL FALLO       const url = `${this.apiUrl}`;
        console.log('URL DE GET ALL USER? que esta actuando',url);
 */       
        return this.http.get<UserResponse>(`${this.apiUrl}/getUsers`).pipe(
            map((res)=> {
                console.log('Respuesta de la api: ', res)
                return res.result
            })
        )
            
        
    }
   
} 