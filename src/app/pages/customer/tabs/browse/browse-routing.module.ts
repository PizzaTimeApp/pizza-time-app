import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowsePage } from './browse.page';

const routes: Routes = [
  {
    path: '',
    component: BrowsePage,
  },
  {
    path: 'pizza/:id',
    loadChildren: () => import('../../../pizzas/show-pizza/show-pizza.module').then(m => m.ShowPizzaPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowsePageRoutingModule {}
