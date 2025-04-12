class Etiqueta {
    constructor(id_etiqueta, id_ingrediente, nombre_ingredente, id_usuario, nombre_usuario, fecha_etiquetado, fecha_caducidad, cantidad, unidad_medida, lugar_almacen) {
        this.id_etiqueta = id_etiqueta
        this.id_ingrediente = id_ingrediente
        this.nombre_ingredente = nombre_ingredente
        this.id_usuario = id_usuario
        this.nombre_usuario = nombre_usuario
        this.fecha_etiquetado = fecha_etiquetado
        this.fecha_caducidad = fecha_caducidad
        this.cantidad = cantidad
        this.unidad_medida = unidad_medida
        this.lugar_almacen = lugar_almacen
    }
}

export default Etiqueta
