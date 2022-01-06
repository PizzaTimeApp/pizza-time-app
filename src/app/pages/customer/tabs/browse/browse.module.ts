import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowsePage } from './browse.page';

import { BrowsePageRoutingModule } from './browse-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BrowsePageRoutingModule,
    ComponentsModule
  ],
  declarations: [BrowsePage]
})
export class BrowsePageModule {}
