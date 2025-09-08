export interface RecipeResponse {
  total: number;
  totlaPages: number;
  currentPage: number;
  limit: number;
  recetas: Recipe[];
}

export interface Recipe {
  id_receta: number;
  nombre: string;
  imagen: null;
  descripcion: string;
  paso_paso: string;
  tiempo_preparacion: number;
  categoria: string;
  estacion: null | string;
}

export interface RecipeViewDetail {
  receta_id: number;
  receta_nombre: string;
  receta_descripcion: string;
  receta_paso_paso: string;
  receta_tiempo_preparacion: number;
  receta_categoria: string;
  ingredientes_formato: string;
}

export interface RecipeArray {
  result: Recipe[];
}

export interface RecipeCategoriaPorcentaje {
  categoria: string;
  total_categoria: number;
  porcentaje: string;
}

export interface RecipeEstacionPorcentaje {
  estacion: string;
  total_estacion: number;
  porcentaje: string;
}
