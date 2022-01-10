import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestEmailPasswordPage } from './request-email-password.page';

const routes: Routes = [
  {
    path: '',
    component: RequestEmailPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestEmailPasswordPageRoutingModule {}
