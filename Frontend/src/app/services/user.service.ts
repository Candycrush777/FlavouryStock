import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, map } from 'rxjs';
import { LoginResponse, User, UserResponse } from '../models/user';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api/users'; 
    
    constructor(private http: HttpClient) { }

    login(user: User): Observable<LoginResponse> {

        const loginData = {
            email: user.email,
            passwd: user.passwd
        };
    /*     console.log('Datos enviados al login:', loginData);
        console.log('¿Email está vacío?', !loginData.email);
        console.log('¿Passwd está vacío?', !loginData.passwd);  */
        
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData).pipe(
            tap((response) => {
                /* console.log('Respuesta completa', response); */
                localStorage.setItem('UserLogin', response.id_rol.toString())
                
            }),
            catchError(error => {
                /* console.log('Error completo:', error);
                console.log('Mensaje del backend:', error.error); */
                throw error;
            })
        ); 
    }

    logOut() {
        localStorage.clear()
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, user);
    }

    getAllUser():Observable<User[]>{
     
        return this.http.get<UserResponse>(`${this.apiUrl}/getUsers`).pipe(
            map((res)=> {
                console.log('Respuesta de la api: ', res)
                return res.result
            })
        )
            
        
    }

    UpdateUserById(userId : number,user: User):Observable<User>{
             
        const url = `${this.apiUrl}/update/${userId}`;
        /* console.log('URL DE PATCH EDIT USER? que esta actuando',url); */
 
        return this.http.patch<User>(`${this.apiUrl}/update/${userId}`, user)
    }

    deleteUserById(userId: number):Observable<User>{
        return this.http.delete<User>(`${this.apiUrl}/delete/${userId}`)
    }
   
} 