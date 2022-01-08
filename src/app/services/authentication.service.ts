import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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

  constructor(private storage: Storage,private router:Router, private authApi: AuthUserService, private alertController: AlertController) {  
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
    
    const alert = await this.alertController.create({
      header: 'Token expiré',
      buttons: ['OK'],
    });

    if(token || token != null || token != undefined){
      await this.authApi.checkToken().subscribe(res => {        
        if(res.success !== false) {
          this.isAuthenticated.next(true);  
          // console.log(res);
          
        } else {
          console.log("data false");
          alert.present();
          alert.onDidDismiss();
          this.logout();
        }
      })
    }
    else {
      this.isAuthenticated.next(false);
    } 
  }
    // catch(e) {
    //     console.log(e);
    //     const alert = await this.alertController.create({
    //       header: 'Token expiré',
    //       buttons: ['OK'],
    //     });
    //     await alert.present();
    //     await alert.onDidDismiss();
    //     await this.logout();
    //   }
    // }
    // if(token || token != null || token != undefined) {
    //   let data = this.authApi.checkToken();
    //   console.log(data);
      
        // if(data.success !== false) {
        //   this.isAuthenticated.next(true);  
        // } else {
        //   console.log("data false");
        //     await alert.present();
        //     await alert.onDidDismiss();
        //     await this.logout();
        // }
    // }
    //   })
    // } else {
    //   this.isAuthenticated.next(false);
    // }
  // }

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
    this.router.navigateByUrl('/', { replaceUrl: true});
    return this.storage.remove('AUTH_TOKEN');
  }
}
