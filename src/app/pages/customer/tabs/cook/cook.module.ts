import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookPage } from './cook.page';

import { CookPageRoutingModule } from './cook-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CookPageRoutingModule
  ],
  declarations: [CookPage]
})
export class CookPageModule {}
