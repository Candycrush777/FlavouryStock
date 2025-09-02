export interface EtiquetaResponse{
    result: Etiqueta[]
}

export interface Etiqueta {
  
    
    //vista_etiqueta_detalle
    
    id_etiqueta: number,
    id_ingrediente: number,
    nombre: string,
    id_usuario: number,
    nombre_usuario: string
    fecha_etiquetado: Date,
    fecha_caducidad: Date,
    cantidad: number,
    unidad_medida: string,
    lugar_almacen: string
}

export interface CaducidadPorcentajes {
  caducado: number;
  caducaPronto: number;
  vigente: number;
}