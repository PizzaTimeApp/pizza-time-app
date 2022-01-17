import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientPageRoutingModule } from './ingredient-routing.module';

import { IngredientPage } from './ingredient.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [IngredientPage]
})
export class IngredientPageModule {}
