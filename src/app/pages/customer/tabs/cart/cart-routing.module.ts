import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPage } from './cart.page';

const routes: Routes = [
  {
    path: '',
    component: CartPage,
  },
  {
    path: 'cart-modal',
    loadChildren: () => import('./cart-modal/cart-modal.module').then( m => m.CartModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartPageRoutingModule {}
