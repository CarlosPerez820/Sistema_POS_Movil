import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPagosPageRoutingModule } from './registro-pagos-routing.module';

import { RegistroPagosPage } from './registro-pagos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPagosPageRoutingModule
  ],
  declarations: [RegistroPagosPage]
})
export class RegistroPagosPageModule {}
