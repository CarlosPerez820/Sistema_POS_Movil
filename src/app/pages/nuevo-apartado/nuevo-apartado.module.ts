import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoApartadoPageRoutingModule } from './nuevo-apartado-routing.module';

import { NuevoApartadoPage } from './nuevo-apartado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoApartadoPageRoutingModule
  ],
  declarations: [NuevoApartadoPage]
})
export class NuevoApartadoPageModule {}
