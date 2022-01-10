import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from 'src/api/auth/auth-user.service';

import { AuthenticationService } from 'src/app/services/authentication.service';

import { ToastComponent } from 'src/app/components/alerts/toast/toast.component';
import { LoadingComponent } from '../../../components/alerts/loading/loading.component';
import { AlertComponent } from '../../../components/alerts/alert/alert.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  userPassword: FormGroup;
  token: string;
  params: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authApi: AuthUserService,
    private toast: ToastComponent,
    private alert: AlertComponent,
    private loading: LoadingComponent
  ) {

    this.route.params
      .subscribe(params => {                
        this.token = params['token'];
      }
    )
   }

  ngOnInit() {
    this.userPassword = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
    
    this.params = new HttpParams()
    .set('token', this.token)   
  }

  get password() {
    return this.userPassword.get('password');
  }
  get confirmPassword() {
    return this.userPassword.get('confirmPassword');
  }

  async resetPassword(){
    const loading = await this.loading.createLoading();
            
    this.authApi.resetPassword(this.userPassword.value, this.token).subscribe(
      async (res) => {
        await loading.onDidDismiss();
        await this.toast.presentToast("Mot de passe modifié avec succès", 3000);
        // this.router.navigateByUrl('/login', { replaceUrl: true});
      },
      async (err) => {
        // console.log(err);
        await loading.onDidDismiss();
        if(err.error.error) {
          this.alert.presentAlert('Un problème est survenu', err.error.error, ['Réessayer']);
        }
        else {
          this.toast.presentToast("Erreur lors de la modification, veuillez réessayer", 3000);
        }
      }
    );
  }
}