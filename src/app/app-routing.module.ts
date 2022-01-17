import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/customer/tabs/tabs/customer-tabs.module').then(m => m.CustomerTabsPageModule),
    canLoad:[AuthGuard] 
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/admin/tabs/tabs/admin-tabs.module').then(m => m.AdminTabsPageModule),
    canLoad:  [IsAdminGuard] 
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reset-password/:token',
    loadChildren: () => import('./pages/auth/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'request-email-password',
    loadChildren: () => import('./pages/auth/request-email-password/request-email-password.module').then( m => m.RequestEmailPasswordPageModule)
  },
  {
    path: 'pizza',
    loadChildren: () => import('./pages/admin/pizza/pizza.module').then( m => m.PizzaPageModule)
  },
  {
    path: 'ingredient',
    loadChildren: () => import('./pages/admin/ingredient/ingredient.module').then( m => m.IngredientPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/admin/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/admin/user/user.module').then( m => m.UserPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
