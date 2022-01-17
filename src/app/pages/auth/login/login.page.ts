import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthenticationService } from '../../../services/authentication.service';
import { AuthUserService } from 'src/api/auth/auth-user.service';

import { AlertComponent } from '../../../components/alerts/alert/alert.component';
import { LoadingComponent } from '../../../components/alerts/loading/loading.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;

  decodeJwt = new JwtHelperService();

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private alert: AlertComponent,
    private loading: LoadingComponent,
    private authApi: AuthUserService,
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  async login() {
    const loading = await this.loading.createLoading();
    this.authApi.login(this.credentials.value).subscribe(
      async (res) => {
        if(res.success == false) {
          await loading.onDidDismiss();
          this.alert.presentAlert("Un problème est survenu", res.error, ['Réessayer']);
        } else {
          this.loading.dismissLoading(loading);
          this.authService.login(res.body.token);
          // this.authApi.checkToken().subscribe(data => {
          let decodeToken = this.decodeJwt.decodeToken(res.body.token);
          if(decodeToken.isAdmin == "user") {
            this.router.navigateByUrl('/app/user', { replaceUrl: true});
          } else {
            this.router.navigateByUrl('/app/admin', { replaceUrl: true});
          }
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
