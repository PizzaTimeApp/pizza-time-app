import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowOrderPage } from './show-order.page';

const routes: Routes = [
  {
    path: '',
    component: ShowOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowOrderPageRoutingModule {}
