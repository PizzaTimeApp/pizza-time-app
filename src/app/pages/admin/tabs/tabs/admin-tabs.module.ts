import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminTabsPageRoutingModule } from './admin-tabs-routing.module';

import { AdminTabsPage } from './admin-tabs.page';

@NgModule({
  imports: [
  IonicModule,
    CommonModule,
    FormsModule,
    AdminTabsPageRoutingModule
  ],
  declarations: [AdminTabsPage]
})
export class AdminTabsPageModule {}
