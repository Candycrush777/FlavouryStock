export interface StockageView {
  id_ingrediente: number; 
  ingrediente: string;
  categoria:string;
  unidad_medida:string;
  cantidad_almacen: number;
  cantidad_nevera: number;
  cantidad_congelador: number;
  qty_total: number;
}

export interface StockageResponse {
  result: StockageView[];
}

export interface Stockage {
  id_ingrediente: number ;
  cantidad_almacen?: number;
  cantidad_nevera?: number;
  cantidad_congelador?: number;
}

export interface DeleteResponse {
  message: string;
}

export interface RegisterResponse {
  message: string;
  lugaresInvalidos?: string[];
}

export interface RegisterBasketPayload {
  id_ingrediente: number;
  cantidad_almacen: number;
  cantidad_nevera: number;
  cantidad_congelador: number;
  id_usuario: number;
}

export interface StockagePorcentajes {
  total_almacen: string;
  total_nevera: string;
  total_congelador: string;
  total_general: string;
  porcentaje_almacen: string;
  porcentaje_nevera: string;
  porcentaje_congelador: string;
}
