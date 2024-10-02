import { Routes } from '@angular/router';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';

export const routes: Routes = [
    {
        path: 'barra',
        component: BarraLateralComponent
    },
    {
        path : 'clientes',
        component: ClientesComponent
    },
    {
        path:'proveedores',
        component: ProveedoresComponent
    }
];
