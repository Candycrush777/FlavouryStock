
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
    imagen:             null;
    descripcion:        string;
    tiempo_preparacion: number;
    categoria:          string;
    estacion:           null | string;
}
