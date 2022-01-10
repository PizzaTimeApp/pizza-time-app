import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/api/auth/auth-user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';

import { AlertComponent } from '../../../components/alerts/alert/alert.component';
import { LoadingComponent } from '../../../components/alerts/loading/loading.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private authApi: AuthUserService,
    private storage: Storage,
    private alert: AlertComponent,
    private loading: LoadingComponent,
  ) { }

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
    this.setForm();
  }

  async setForm() {
    let data = await this.storage.get('user_data');
    if(data) {
      this.user.patchValue({
        email: data[0],
        username: data[1],
        lastname: data[2],
        firstname: data[3],
        dateOfBirth: data[4],
        phone: data[5],
        gender: data[6],
        address: data[7],
        city: data[8],
        zip: data[9],
        password: '', 
        confirmPassword: ''
      });
    }
    
  }

  get email() {
    return this.user.get('email');
  }
  get username() {
    return this.user.get('username');
  }  
  get lastname() {
    return this.user.get('lastname');
  }
  get firstname() {
    return this.user.get('password');
  }  
  get dateOfBirth() {
    return this.user.get('dateOfBirth');
  }
  get phone() {
    return this.user.get('phone');
  }  
  get gender() {
    return this.user.get('gender');
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
  get password() {
    return this.user.get('password');
  }
   get confirmPassword() {
    return this.user.get('confirmPassword');
  }

  get f() { return this.user.controls; }

  getLoginCredentials() {
    let credentials;
    return credentials = {
      email: this.f.email.value,
      password: this.f.password.value,
    }
  }

  async register() {
    const loading = await this.loading.createLoading();
    
    this.storage.set("user_data",[
      this.f.email.value,
      this.f.username.value,
      this.f.lastname.value,
      this.f.firstname.value,
      this.f.dateOfBirth.value,
      this.f.phone.value,
      this.f.gender.value,
      this.f.address.value,
      this.f.city.value,
      this.f.zip.value,
    ]);

    this.authApi.register(this.user.value).subscribe(
      async (res) => {
        this.authApi.login(this.getLoginCredentials()).subscribe(
          async (res) => {
            await loading.onDidDismiss();
            this.authService.login(res.body.token);
            this.router.navigateByUrl('/app', { replaceUrl: true});
            this.storage.remove('user_data');
          },
        )
      },
      async (err) => {
        await loading.onDidDismiss();
        this.alert.presentAlert('Un problème est survenu', err.error.error, ['Réessayer']);
      }
    );
  }

}
