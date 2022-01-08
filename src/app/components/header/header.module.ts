import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule
  ],
  declarations: []
})
export class HeaderModule {}
