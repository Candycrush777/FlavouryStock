
export interface RecipeResponse {
    result: Recipe[];
}

export interface Recipe {
    id_receta:          number;
    nombre:             string;
    imagen:             null;
    descripcion:        string;
    tiempo_preparacion: number;
    categoria:          Categoria;
    estacion:           Estacion | null;
}

export enum Categoria {
    Cena = "cena",
    Comida = "comida",
    Desayuno = "desayuno",
    Postre = "postre",
    Vegano = "vegano",
}

export enum Estacion {
    Invierno = "invierno",
    Otoño = "otoño",
    Primavera = "primavera",
    Verano = "verano",
}
