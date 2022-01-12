import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowPizzaPageRoutingModule } from './show-pizza-routing.module';

import { ShowPizzaPage } from './show-pizza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowPizzaPageRoutingModule
  ],
  declarations: [ShowPizzaPage]
})
export class ShowPizzaPageModule {}
