import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePizzaPageRoutingModule } from './create-pizza-routing.module';

import { CreatePizzaPage } from './create-pizza.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    CreatePizzaPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [CreatePizzaPage]
})
export class CreatePizzaPageModule {}
