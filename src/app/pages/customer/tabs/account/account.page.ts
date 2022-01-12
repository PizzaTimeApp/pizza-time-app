import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { AuthUserService } from 'src/api/auth/auth-user.service';
import { LoadingComponent } from '../../../../components/alerts/loading/loading.component';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from 'src/app/components/alerts/alert/alert.component';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  username = null;

  constructor(
    private authApi: AuthUserService,
    private router: Router,
    private alertController: AlertController,
    private alert: AlertComponent,
    private loading: LoadingComponent,
    private authService: AuthenticationService,
    private AuthApi: AuthUserService
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.authApi.getProfile().subscribe(data => {
      this.username = data.body.user.username;      
    })
  }


  async deleteProfile() {
    let deleteAlert = await this.alertController.create({
      header: 'Suppression de votre compte',
      message: "Êtes-vous sûr ?",
      buttons: [
          {
              text: 'Non',
          },
          {
              text: 'Supprimer',
              handler: async () => {
                const loading = await this.loading.createLoading();
                this.authApi.deleteProfile().subscribe(
                  async (res) => {
                    if(res.success == false) {
                      await loading.onDidDismiss();
                      this.alert.presentAlert("Un problème est survenu", res.error, ['Réessayer']);
                    } else {
                      await loading.onDidDismiss();
                      this.authService.logout();
                      // this.router.navigateByUrl('/app/user/account', { replaceUrl: true});
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
      ]
    })
    deleteAlert.present();
  }
}
