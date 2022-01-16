import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CustomerApiOrderService } from 'src/api/order/customer/customer-api-order.service';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';
import { AlertController } from '@ionic/angular';
import { AlertComponent } from 'src/app/components/alerts/alert/alert.component';
import { ToastComponent } from 'src/app/components/alerts/toast/toast.component';
import { LoadingComponent } from 'src/app/components/alerts/loading/loading.component';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage {

  pizzas = [];
  totalAmount = null;

  currentUserCart;
  constructor(
    private storage: Storage,
    private router:Router, 
    private alertController: AlertController,
    private customerApiOrder: CustomerApiOrderService,
    private customerApiPizza: CustomerApiPizzaService,
    private alert: AlertComponent,
    private toast: ToastComponent,
    private loading: LoadingComponent
  ) { }

  ngOnInit() {
    this.getItemCart();
  }

  async getUserCart() {
    this.currentUserCart = await this.storage.get('USER_CART');   
    this.currentUserCart = JSON.parse(this.currentUserCart);  

    return this.currentUserCart;
  }

  async getItemCart() {
    this.currentUserCart = await this.getUserCart();
    
    if(this.currentUserCart != null || this.currentUserCart != undefined){
      for(let i = 0; i < this.currentUserCart.length; i++) {
        this.customerApiPizza.getPizza(this.currentUserCart[i].idPizza).subscribe(data => {
          this.pizzas.push(data.body.pizza);
          this.pizzas[i]['quantity'] = this.currentUserCart[i].quantity;
          this.pizzas[i]['totalAmount'] = this.currentUserCart[i].quantity * this.pizzas[i].price;
          this.totalAmount += (this.pizzas[i]['price'] * this.currentUserCart[i].quantity);
        })
      } 
    }
  }

  async deleteItemCart(idPizza) {
    this.currentUserCart = await this.getUserCart();
    let deleteAlert = await this.alertController.create({
      header: 'Suppression de votre panier',
      message: "Êtes-vous sûr ?",
      buttons: [
          {
              text: 'Non',
          },
          {
              text: 'Supprimer',
              handler: async () => {
                let updatedUserCart = this.currentUserCart.filter(item=> item.idPizza !== idPizza);
                updatedUserCart = JSON.stringify(updatedUserCart);
                this.storage.set('USER_CART', updatedUserCart);
                window.location.reload();
              }
          }
      ]
    })
    deleteAlert.present();
  }

  async checkout() {
    const loading = await this.loading.createLoading();

    this.currentUserCart = await this.getUserCart();
    this.customerApiOrder.postOrder(this.currentUserCart).subscribe(
      async (res) => {
        if(res.success == false) {
          await loading.onDidDismiss();
          this.alert.presentAlert("Un problème est survenu", res.error, ['Réessayer']);
        } else {
          this.loading.dismissLoading(loading);
          await this.toast.presentToast("Commande enregistrée avec succès", 3000);
          this.storage.remove('USER_CART');      
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/']);
        });
        }
      },
      async (err) => {
        await loading.onDidDismiss();
        this.alert.presentAlert("Un problème est survenu", err.error.error, ['Réessayer']);
      }
    );
  }
}
