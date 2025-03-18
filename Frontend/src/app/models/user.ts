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
    id_rol: number;  // userLogin contiene los datos del usuario y como solo esta mandando el id_rol se pone asi
    //si queremos todo el usuario hay que modificar en el back que devuelva todo el usuario
}