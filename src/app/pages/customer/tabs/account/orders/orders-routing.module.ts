import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowOrderPage } from 'src/app/pages/orders/show-order/show-order.page';

import { OrdersPage } from './orders.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage
  },
  {
    path: 'order/:id',
    loadChildren: () => import('../../../../orders/show-order/show-order.module').then( m => m.ShowOrderPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
