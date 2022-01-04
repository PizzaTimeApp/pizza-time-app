import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Storage } from '@ionic/storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private storage: Storage) {}
  
    intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {



    const AUTH_TOKEN = this.storage.get('AUTH_TOKEN');   ;

    if (AUTH_TOKEN) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + AUTH_TOKEN),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}