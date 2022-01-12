import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowPizzaPage } from './show-pizza.page';

const routes: Routes = [
  {
    path: '',
    component: ShowPizzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowPizzaPageRoutingModule {}
