import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApartadoRopaPageRoutingModule } from './apartado-ropa-routing.module';

import { ApartadoRopaPage } from './apartado-ropa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApartadoRopaPageRoutingModule
  ],
  declarations: [ApartadoRopaPage]
})
export class ApartadoRopaPageModule {}
