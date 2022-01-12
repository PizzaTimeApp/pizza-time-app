import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowOrderPageRoutingModule } from './show-order-routing.module';

import { ShowOrderPage } from './show-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowOrderPageRoutingModule
  ],
  declarations: [ShowOrderPage]
})
export class ShowOrderPageModule {}
