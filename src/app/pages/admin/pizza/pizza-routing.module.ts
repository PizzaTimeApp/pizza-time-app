import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaPage } from './pizza.page';

const routes: Routes = [
  {
    path: '',
    component: PizzaPage
  },
  {
    path: 'create-pizza',
    loadChildren: () => import('./create-pizza/create-pizza.module').then( m => m.CreatePizzaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzaPageRoutingModule {}
