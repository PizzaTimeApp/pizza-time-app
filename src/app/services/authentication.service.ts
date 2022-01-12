import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { AuthUserService } from 'src/api/auth/auth-user.service';
import { AlertComponent } from '../components/alerts/alert/alert.component';

const AUTH_TOKEN = '';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(
    private storage: Storage,
    private router:Router, 
    private authApi: AuthUserService, 
    private alertController: AlertController,
    private alert: AlertComponent) {  
    this.loadToken();
    this.checkToken();
  }

  async getCurrentToken() {
    var token:string;
    await this.storage.get('AUTH_TOKEN').then(data=>token = data);
    return token; 
  }

  async checkToken() {
    const token = await this.storage.get('AUTH_TOKEN');   
    


    if(token || token != null || token != undefined){
      await this.authApi.checkToken().subscribe(
        async (res) => { 
          this.isAuthenticated.next(true);  
          console.log("connected");
        },
        async (err) => {
          console.log(err);
          await this.alert.presentAlert('Token epxiré', null, ['Ok'], true);    
          this.logout();

        } 
      )
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

  login(token){     
    if(token) {
      this.storage.set('AUTH_TOKEN', token);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/', { replaceUrl: true});
    return this.storage.remove('AUTH_TOKEN');
  }
}
