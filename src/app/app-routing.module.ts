import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./pages/inventario/inventario.module').then( m => m.InventarioPageModule)
  },
  {
    path: 'nuevo-producto',
    loadChildren: () => import('./pages/nuevo-producto/nuevo-producto.module').then( m => m.NuevoProductoPageModule)
  },
  {
    path: 'editar-producto/:id',
    loadChildren: () => import('./pages/editar-producto/editar-producto.module').then( m => m.EditarProductoPageModule)
  },
  {
    path: 'apartado-ropa',
    loadChildren: () => import('./pages/apartado-ropa/apartado-ropa.module').then( m => m.ApartadoRopaPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'cliente-editar/:id',
    loadChildren: () => import('./pages/cliente-editar/cliente-editar.module').then( m => m.ClienteEditarPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'corte-caja',
    loadChildren: () => import('./pages/corte-caja/corte-caja.module').then( m => m.CorteCajaPageModule)
  },
  {
    path: 'nuevo-apartado',
    loadChildren: () => import('./pages/nuevo-apartado/nuevo-apartado.module').then( m => m.NuevoApartadoPageModule)
  },
  {
    path: 'nuevo-cliente',
    loadChildren: () => import('./pages/nuevo-cliente/nuevo-cliente.module').then( m => m.NuevoClientePageModule)
  },
  {
    path: 'registro-pagos',
    loadChildren: () => import('./pages/registro-pagos/registro-pagos.module').then( m => m.RegistroPagosPageModule)
  },
  {
    path: 'soporte',
    loadChildren: () => import('./pages/soporte/soporte.module').then( m => m.SoportePageModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./pages/ventas/ventas.module').then( m => m.VentasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
