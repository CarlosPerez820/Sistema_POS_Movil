import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteEditarPageRoutingModule } from './cliente-editar-routing.module';

import { ClienteEditarPage } from './cliente-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteEditarPageRoutingModule
  ],
  declarations: [ClienteEditarPage]
})
export class ClienteEditarPageModule {}
