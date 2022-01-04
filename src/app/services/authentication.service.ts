import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthUserService } from 'src/api/auth/auth-user.service';

const AUTH_TOKEN = '';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private storage: Storage, private authApi: AuthUserService) {   
    this.loadToken();
    this.checkToken();
  }



  async checkToken() {
    const token = await this.storage.get('AUTH_TOKEN');    
    if(token) {
      this.authApi.checkToken().subscribe((data) => {
        console.log(data);
      })
    } else {

    }
  
  }

  async loadToken() {
    const token = await this.storage.get('AUTH_TOKEN');    
    if(token) {
      console.log('set token: ', token);
      this.token = token.value;
      this.isAuthenticated.next(true);      
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: {email, password}): Observable<any>{     
    return this.authApi.login(credentials).pipe(
      map((data:any) => data.body.token),
      switchMap(token => {
        return from(this.storage.set('AUTH_TOKEN', token));
      }),
      tap(_=> {
        this.isAuthenticated.next(true);
      })
    );
  }

  register() {

  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return this.storage.remove('AUTH_TOKEN');
  }
}
