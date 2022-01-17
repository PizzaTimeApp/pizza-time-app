
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanLoad {

  constructor(
      private authService: AuthenticationService, 
      private router: Router,
      
    ) {}
   
  canLoad(): Observable<boolean> {
    return this.authService.isAdmin.pipe(    
      filter(val => val !== null),
      take(1),
      map(isAdmin => {
        if(isAdmin) {
            return true;
        } else {
            this.router.navigateByUrl('/app/user', { replaceUrl: true });
        }
      })
    );
  }
  
}
