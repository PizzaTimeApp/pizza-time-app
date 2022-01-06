import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, mergeMap } from "rxjs/operators";
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    token: any;
    constructor(private storage: Storage, private authService: AuthenticationService) {}
  
    intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
 
    let promise = this.storage.get('AUTH_TOKEN');
    
    return from(promise).pipe(mergeMap(token=>{
      if (token || token != null ||  token != undefined) {
        const clonedReq = req.clone({
          setHeaders: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' +  token, 
          }
        });
        return next.handle(clonedReq);
      } else {
        return next.handle(req);
      }
    }));
  }
}