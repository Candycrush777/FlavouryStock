class StockageView {
  constructor(id_ingrediente,ingrediente,categoria,cantidad_almacen,cantidad_nevera,canditad_congelador,qty_total){
    this.id_ingrediente = id_ingrediente;
    this.ingrediente = ingrediente;
    this.categoria=categoria;
    this.unidad_medida= unidad_medida;
    this.cantidad_almacen = cantidad_almacen;
    this.cantidad_nevera = cantidad_nevera;
    this.canditad_congelador = canditad_congelador;
    this.qty_total = qty_total;
  }
}


export default StockageView;