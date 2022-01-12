import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/api/auth/auth-user.service';
import { AlertComponent } from 'src/app/components/alerts/alert/alert.component';
import { LoadingComponent } from 'src/app/components/alerts/loading/loading.component';
import { ToastComponent } from 'src/app/components/alerts/toast/toast.component';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  user: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authApi: AuthUserService,
    private alert: AlertComponent,
    private loading: LoadingComponent,
    private toast: ToastComponent

  ) { }

  ngOnInit() {
    this.user = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  get password() {
    return this.user.get('password');
  }
   get confirmPassword() {
    return this.user.get('confirmPassword');
  }


  async updateUserPassword() {
    const loading = await this.loading.createLoading();
           
    this.authApi.updatePassword(this.user.value).subscribe(
      async (res) => {
        if(res.success == false) {
          await loading.onDidDismiss();
          this.alert.presentAlert("Un problème est survenu", res.error, ['Réessayer']);
        } else {
          await loading.onDidDismiss();
          this.router.navigateByUrl('/app/user/account', { replaceUrl: true});
          this.toast.presentToast("Mot de passe modifié avec succès", 3000);
        }
      },
      async (err) => {
        // console.log(err);
        await loading.onDidDismiss();
        this.alert.presentAlert("Un problème est survenu", err.error.error, ['Réessayer']);
      }
    );
  }
  
}
