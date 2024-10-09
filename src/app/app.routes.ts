import { Routes } from '@angular/router';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { AreasComponent } from './components/areas/areas.component';

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
    },
    {
        path:'empleados',
        component: EmpleadosComponent
    },
    {
        path: 'areas',
        component: AreasComponent
    }
];
