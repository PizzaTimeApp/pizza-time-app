import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateIngredientPage } from './create-ingredient.page';

const routes: Routes = [
  {
    path: '',
    component: CreateIngredientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateIngredientPageRoutingModule {}
