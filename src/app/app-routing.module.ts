import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
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
    canLoad: [AuthGuard] 
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/customer/home/home.module').then( m => m.HomePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
