import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookPage } from './cook.page';

import { CookPageRoutingModule } from './cook-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CookPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CookPage]
})
export class CookPageModule {}
