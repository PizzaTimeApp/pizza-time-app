import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(
    private modal: ModalController,
    private routerOutlet: IonRouterOutlet
    ) { }

  ngOnInit() {}
 
  async presentModal(component, classname, data) {
    const modal = await this.modal.create({
      component: component,
      cssClass: classname,
      componentProps: { 
        data: data,
      },
      swipeToClose: true,
      breakpoints: [0.1, 0.5, 1],
      initialBreakpoint: 0.5,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  dismiss() {
    this.modal.dismiss({
      'dismissed': true
    });
  }
  
}
