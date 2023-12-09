
export interface Inventario {
    _id?: number;
    nombre?: string;
    descripcion?: string;
    talla?: string;
    categoria?: string;
    foto?: string;
    precio_compra?: string;
    precio_venta?: string;
    cantidad?: string;
    marca?: string;
    codigo?: string;
    liquidacion?: string;
    descuento?: string;
}

export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    token?: string;
    msg?: string;
    area: string;
    password: string;
}

export interface Usuario {
    uid: string;
    name: string;
    email: string;
    area: string; 
}

export interface Cliente {
    _id?: number;
    nombre?: string;
    telefono?: string;
    direccion?: string;
    redes_sociales?: string;
    fecha?: string;
    puntos?: string;
}

export interface Apartado {
    _id?: number;
    fecha_apartado?: string;
    nombre_cliente?: string;
    fecha_limite?: string;
    total_pagar?: string;
    total_restante?: string;
    fecha_ultimo_abono?: string;
    cantidad_ultimo_abono?: string;
    fecha_entrega?: string;
    articulos?: string;
}

export interface Pago {
    _id?: number;
    producto?: string;
    cliente?: string;
    fecha_abono?: string;
    cantidad_abono?: string;
    codigo_apartado?: string;
    fecha_pedido?: string;
    fecha_limite?: string;
    hora_abono?: string;
}

export interface Venta {
    _id?: number;
    fecha_venta?: string;
    hora_venta?: string;
    nombre_articulo?:string;
    precio_unitario_art?: string;
    cantidad_art?: string;
    subtotal?: string;
    total_art?: string;
    descuento?: string;
    total_final?: string;
}