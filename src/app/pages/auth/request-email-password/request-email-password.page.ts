import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthUserService } from 'src/api/auth/auth-user.service';

import { ToastComponent } from '../../../components/alerts/toast/toast.component';
import { AlertComponent } from '../../../components/alerts/alert/alert.component';
import { LoadingComponent } from '../../../components/alerts/loading/loading.component';

@Component({
  selector: 'app-request-email-password',
  templateUrl: './request-email-password.page.html',
  styleUrls: ['./request-email-password.page.scss'],
})
export class RequestEmailPasswordPage implements OnInit {

  userEmail: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authApi: AuthUserService,
    private toast: ToastComponent,
    private alert: AlertComponent,
    private loading: LoadingComponent,
  ) { }

  ngOnInit() {
    this.userEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get email() {
    return this.userEmail.get('email');
  }

  async requestEmailPassword(){
    const loading = await this.loading.createLoading();
    
    this.authApi.requestEmailPassword(this.userEmail.value).subscribe(
      async (res) => {
        await loading.onDidDismiss();
        this.userEmail.reset();
        this.toast.presentToast("Email envoyé avec succès", 3000);
      },
      async (err) => {
        // console.log(err);
        await loading.onDidDismiss();
        this.toast.presentToast("Erreur lors de l'envoi, veuillez réessayer", 3000);
      }
    );
  }
}
