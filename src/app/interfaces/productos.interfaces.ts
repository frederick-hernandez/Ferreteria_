export interface ProductosInterface{
    id: number;
    title: string;
    description: string;
    proveedor_id: number;
    price:number;
    category: string;
    image: string;
}
export interface ProductosSinId{
    title: string;
    description: string;
    proveedor_id: number;
    price:number;
    category: string;
    image: string;
}