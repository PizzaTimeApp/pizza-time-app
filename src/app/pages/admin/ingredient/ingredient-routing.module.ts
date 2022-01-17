import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientPage } from './ingredient.page';

const routes: Routes = [
  {
    path: '',
    component: IngredientPage
  },
  {
    path: 'create-ingredient',
    loadChildren: () => import('./create-ingredient/create-ingredient.module').then( m => m.CreateIngredientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientPageRoutingModule {}
