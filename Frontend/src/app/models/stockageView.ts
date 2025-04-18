export interface StockageView {
    ingrediente:         string;
    cantidad_almacen:    number;
    cantidad_nevera:     number;
    cantidad_congelador: number;
    qty_total:           number;
  }
  
    export interface StockageResponse {
    result: StockageView[];
  }

  