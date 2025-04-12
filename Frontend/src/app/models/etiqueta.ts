export interface EtiqietaResponse{
    result: Etiqueta[]
}

export interface Etiqueta {
    //va a ser leida desde una vista, para poder 
    // coger nombre ingrediente e imagen
    
    //vista_etiqueta_detalle
    
    id_etiqueta: number,
    id_ingrediente: number,
    nombre_ingredente: string,
    id_usuario: number,
    nombre_usuario: string
    fecha_etiquetado: Date,
    fecha_caducidad: Date,
    cantidad: number,
    unidad_medida: string,
    lugar_almacen: string
}