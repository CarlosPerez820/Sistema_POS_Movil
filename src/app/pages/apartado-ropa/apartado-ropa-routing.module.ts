import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApartadoRopaPage } from './apartado-ropa.page';

const routes: Routes = [
  {
    path: '',
    component: ApartadoRopaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartadoRopaPageRoutingModule {}
