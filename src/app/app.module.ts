import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
=======
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
>>>>>>> e6dae5355b38c04cbfddf6bb5178eb1a8562b842
import { AuthInterceptor } from './services/authInterceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
<<<<<<< HEAD
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot({name: 'app',
  driverOrder: ['localstorage']}),HttpClientModule],
  providers: [
    {
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy, 
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
=======
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot({name: 'app',
  driverOrder: ['localstorage']})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }],
>>>>>>> e6dae5355b38c04cbfddf6bb5178eb1a8562b842
  bootstrap: [AppComponent],
})
export class AppModule {}
