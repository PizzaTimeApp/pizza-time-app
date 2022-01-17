import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartModalPageRoutingModule } from './cart-modal-routing.module';

import { CartModalPage } from './cart-modal.page';
import { RouterModule } from '@angular/router';

import { CustomerTabsPage } from '../../tabs/customer-tabs.page';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    CartModalPageRoutingModule,
    RouterModule
  ],
  declarations: [CartModalPage]
})
export class CartModalPageModule {}
