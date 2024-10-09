export interface ProductosInterface{
    id: number;
    nombre: string;
    precio_actual: number;
    stock: number;
    proveedor_id: number;
    precio_costo: number;
}
export interface ProductosSinId{
    nombre: string;
    precio_actual: number;
    stock: number;
    proveedor_id: number;
    precio_costo: number;
}