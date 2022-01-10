import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent{

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) { }

  async presentAlert(header = 'Échec', message, buttons = ['Ok']) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    });

    await alert.present();
  }
  

}
