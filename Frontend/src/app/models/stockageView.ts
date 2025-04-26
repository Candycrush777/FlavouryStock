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
