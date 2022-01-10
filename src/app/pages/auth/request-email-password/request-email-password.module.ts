import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestEmailPasswordPageRoutingModule } from './request-email-password-routing.module';

import { RequestEmailPasswordPage } from './request-email-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestEmailPasswordPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [RequestEmailPasswordPage]
})
export class RequestEmailPasswordPageModule {}
