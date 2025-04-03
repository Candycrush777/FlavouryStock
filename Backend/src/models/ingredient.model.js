class Ingrediente {
    constructor(id_ingrediente, nombre, categoria, imagen, unidad_medida, caducidad_almacen, caducidad_nevera, caducidad_congelador){
        this.id_ingrediente = id_ingrediente
        this.nombre = nombre
        this.categoria = categoria
        this.imagen = imagen
        this.unidad_medida = unidad_medida
        this. caducidad_almacen = caducidad_almacen
        this.caducidad_nevera = caducidad_nevera
        this.caducidad_congelador = caducidad_congelador
    }
}

export default Ingrediente