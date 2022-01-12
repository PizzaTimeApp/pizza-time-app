import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/api/auth/auth-user.service';
import { AlertComponent } from 'src/app/components/alerts/alert/alert.component';
import { LoadingComponent } from 'src/app/components/alerts/loading/loading.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastComponent } from 'src/app/components/alerts/toast/toast.component';


@Component({
  selector: 'app-informations',
  templateUrl: './informations.page.html',
  styleUrls: ['./informations.page.scss'],
})
export class InformationsPage implements OnInit {

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
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
    })
    this.setForm();
  }

  async setForm() {
    var userInformations;
    this.authApi.getProfile().subscribe(async data =>  {
      userInformations = await data.body.user;
      if(userInformations) {
        this.user.patchValue({
          email: userInformations.email,
          username: userInformations.username,
          phone: userInformations.phone,
          address: userInformations.address,
          city: userInformations.city,
          zip: userInformations.zip,  
        });
      }
    });
  }

  get email() {
    return this.user.get('email');
  }
  get username() {
    return this.user.get('username');
  }  
  get phone() {
    return this.user.get('phone');
  }  
  get address() {
    return this.user.get('address');
  }  
  get city() {
    return this.user.get('city');
  }
  get zip() {
    return this.user.get('zip');
  }

  async updateUser() {
    const loading = await this.loading.createLoading();
           
    this.authApi.updateProfile(this.user.value).subscribe(
      async (res) => {
        // console.log(res);
        await loading.onDidDismiss();
        this.toast.presentToast("Modification de votre profile avec succès", 3000);
      },
      async (err) => {
        // console.log(err);
        await loading.onDidDismiss();
        this.alert.presentAlert('Un problème est survenu', err.error.error, ['Réessayer']);
      }
    );
  }

}
