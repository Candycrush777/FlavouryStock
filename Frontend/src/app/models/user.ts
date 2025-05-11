export interface UserResponse {
    result: User[]
}

export interface User {
    id_rol: number;
    id_usuario: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    empresa: string;
    email: string;
    passwd: string;
} 
export interface LoginResponse {
    message: string;
    token:   string;
    id_rol: number; 
    id_user: number; 
}
