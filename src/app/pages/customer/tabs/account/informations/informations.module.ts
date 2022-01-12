import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationsPageRoutingModule } from './informations-routing.module';

import { InformationsPage } from './informations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InformationsPage]
})
export class InformationsPageModule {}
