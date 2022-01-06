import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomerTabsPageRoutingModule } from './customer-tabs-routing.module';

import { CustomerTabsPage } from './customer-tabs.page';

@NgModule({
  imports: [
  IonicModule,
    CommonModule,
    FormsModule,
    CustomerTabsPageRoutingModule
  ],
  declarations: [CustomerTabsPage]
})
export class CustomerTabsPageModule {}
