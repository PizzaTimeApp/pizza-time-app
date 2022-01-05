import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
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

  constructor(private storage: Storage, private authApi: AuthUserService, private alertController: AlertController) {  
    this.loadToken();
    this.checkToken();
  }

  async getCurrentToken() {
    await this.storage.get('AUTH_TOKEN');  
  }

  async checkToken() {
    const token = await this.storage.get('AUTH_TOKEN');    
    if(token) {
      this.authApi.checkToken().subscribe((data) => {
        if(data.success === true) {
          this.isAuthenticated.next(true);  
        } else {
          async () => {
            const alert = this.alertController.create({
              header: 'Token expiré',
              buttons: ['OK'],
            });
            await this.logout();
          }
        }
      })
    } else {
      this.isAuthenticated.next(false);
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
