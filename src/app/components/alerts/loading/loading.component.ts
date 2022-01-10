import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent{

  constructor(
    private loadingController: LoadingController,
  ) { }

  async createLoading(dismiss = false, duration = 3000) {
    const loading = await this.loadingController.create({ 
      spinner: null,
      duration: duration,
      cssClass: 'pizza-loading'
    });
    await loading.present();

    return loading;
  }

  async dismissLoading(loading: HTMLIonLoadingElement) {
    await loading.dismiss()
  }
}

