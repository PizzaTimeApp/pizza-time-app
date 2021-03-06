import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';
import { CustomerApiOrderService } from '../../../../../../api/order/customer/customer-api-order.service';
import { ModalComponent } from '../../../../../components/modal/modal.component';
import { CustomerTabsPage } from '../../tabs/customer-tabs.page';
import { ToastComponent } from '../../../../../components/alerts/toast/toast.component';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  currentModal = null;
  data;
  quantity = 1;

  constructor(
    private storage: Storage,
    private router:Router, 
    private modal: ModalComponent,
    private customerTab: CustomerTabsPage,
    private customerApiPizza: CustomerApiPizzaService,
    private toast: ToastComponent
  ) { }

  ngOnInit() {    
  }
  
  dismissModal() {
    this.modal.dismiss();
  }

  incrementQty(index: number) {
    if(this.quantity == 10) {
      return this.quantity = 10
    } else {    
      this.quantity += 1;
    }
  }

  decrementQty(index: number) {
    if(this.quantity == 1) {
      return this.quantity = 1
    } else {    
      this.quantity -= 1;
    }
  }

  async addToCart(data, redirect = false) {
    let userCart = [];
    let localUserCart = null;
    let cartCounter = 0;

    let currentUserCart = await this.storage.get('USER_CART');   
    if(currentUserCart) {
      currentUserCart = JSON.parse(currentUserCart);
      cartCounter = currentUserCart.length;
    } 

    if(currentUserCart || currentUserCart  != null || currentUserCart  != undefined){        
      let itemExist = currentUserCart.findIndex(item => item.idPizza === data.id);
      if(itemExist !== -1) {
        currentUserCart[itemExist].quantity = this.quantity;
      } else {
        currentUserCart.push({'idPizza': data.id, 'quantity': this.quantity});
        cartCounter += 1;
      }
      localUserCart = JSON.stringify(currentUserCart);
    } else {
      userCart.push({'idPizza': data.id, 'quantity': this.quantity})
      localUserCart = JSON.stringify(userCart);
      cartCounter += 1;
    }
    this.storage.set('USER_CART', localUserCart);
    
    this.customerTab.updateCartCounter(cartCounter);

    if(redirect == true) {
      this.redirectToCart();
    } else {
      await this.toast.presentToast("Article ajout?? au panier", 3000);
      this.dismissModal();
    }
  }

  redirectToCart() {
    this.dismissModal();
    this.router.navigateByUrl("app/user/cart").then(() => {
      window.location.reload();
    });
  }

  getImagePizza(image:any) {
    return this.customerApiPizza.getImagePizza(image);
  }

}
