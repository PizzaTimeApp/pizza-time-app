import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTabsPage } from './customer-tabs.page';

const routes: Routes = [
  {
    path: 'user',
    component: CustomerTabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'browse',
        loadChildren: () => import('../browse/browse.module').then(m => m.BrowsePageModule)
      },
      {
        path: 'cook',
        loadChildren: () => import('../cook/cook.module').then(m => m.CookPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../setting/setting.module').then(m => m.SettingPageModule)
      },
      {
        path: '',
        redirectTo: '/app/user/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/user/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CustomerTabsPageRoutingModule {}
