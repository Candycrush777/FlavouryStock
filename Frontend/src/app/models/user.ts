export interface User {
    id_rol: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    empresa: string;
    email: string;
    passwd: string;
} 
export interface LoginResponse {
    message: string;
    userLogin: User;  // userLogin contiene los datos del usuario
}