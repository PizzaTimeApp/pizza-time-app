import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
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
 
    let token = this.authService.getCurrentToken()

    console.log(token);
       
    if (token || token != null ||  token != undefined) {
      // console.log("fdfd");
    const clonedReq = req.clone({
        setHeaders: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token, 
        }
        });
      return next.handle(clonedReq);
    } else {
      return next.handle(req);
    }
  }
}