import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoApartadoPage } from './nuevo-apartado.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoApartadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoApartadoPageRoutingModule {}
