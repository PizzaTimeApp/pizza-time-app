import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePizzaPage } from './create-pizza.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePizzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePizzaPageRoutingModule {}
