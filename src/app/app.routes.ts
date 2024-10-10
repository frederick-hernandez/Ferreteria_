import { Routes } from '@angular/router';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { AreasComponent } from './components/areas/areas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'home', component: BarraLateralComponent },
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
    },
    {
        path: 'productos',
        component: ProductosComponent
    },

    {
        path:'auth',
        children: [
            {
                path:'signup',
                component: SingUpComponent
            },
            {
                path:'login',
                component: LoginComponent
            }]
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' }

];
