import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTabsPage } from './admin-tabs.page';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminTabsPage,
    children: [
      {
        path: 'pizza',
        loadChildren: () => import('../../pizza/pizza.module').then(m => m.PizzaPageModule)
      },
      {
        path: 'ingredient',
        loadChildren: () => import('../../ingredient/ingredient.module').then(m => m.IngredientPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('../../order/order.module').then(m => m.OrderPageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../../user/user.module').then(m => m.UserPageModule)
      },
      {
        path: '',
        redirectTo: '/app/admin/pizza',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/admin/pizza',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AdminTabsPageRoutingModule {}
