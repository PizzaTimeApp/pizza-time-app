import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/authInterceptor';

//Generic components
import { ToastComponent } from './components/alerts/toast/toast.component';
import { AlertComponent } from './components/alerts/alert/alert.component';
import { LoadingComponent } from './components/alerts/loading/loading.component';
import { RefresherComponent } from './components/refresher/refresher.component';

import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  declarations: [AppComponent], 
  entryComponents: [],
  imports:  [ComponentsModule, BrowserModule, RouterModule.forRoot([], { enableTracing: false }), IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot({name: 'app',
driverOrder: ['localstorage']}), HttpClientModule],
  providers: [
    ToastComponent,
    AlertComponent,
    LoadingComponent,
    RefresherComponent,
    {
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy, 
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
