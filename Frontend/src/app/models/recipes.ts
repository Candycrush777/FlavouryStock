
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
    paso_paso:          string;
    tiempo_preparacion: number;
    categoria:          string;
    estacion:           null | string;
}

