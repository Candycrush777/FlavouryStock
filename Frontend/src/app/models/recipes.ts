
export interface RecipeResponse {
    total:       number;
    totlaPages:  number;
    currentPage: number;
    limit:       number;
    recetas:     Recipe[];
}

export interface Recipe {
    id_receta:          number;
    nombre:             string;
    imagen:             null; //probar string sino funciona
    descripcion:        string;
    tiempo_preparacion: number;
    categoria:          string;
    estacion:           null | string;
}

export interface RecipeCreationResponse {
    message: string;
    id: number; //esto hay que pensar que queremos en la respuesta 

    }


    export interface ApiResponse<T = any> {
        message?: string;
        data?: T;
        error?: string;
      }
      
  
