
export interface listaclientes {
    id: number;
    nombre: string;
    email: string;
    status: string;
   }
  
export interface usuario{
    name: string;
    email: string;
    password: string;
}

export interface crearUsuario{
    nombre: string;
    telefono: string;
    email: string;
        calle : string;
        numero : string;
        comuna: string;
        ciudad: string;
}