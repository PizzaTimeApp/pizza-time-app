import { Component, OnInit } from '@angular/core';
import { CustomerApiPizzaService } from '../../../../api/pizza/customer/customer-api-pizza.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../../components/modal/modal.component';
import { CartModalPage } from 'src/app/pages/customer/tabs/cart/cart-modal/cart-modal.page';

@Component({
  selector: 'app-show-pizza',
  templateUrl: './show-pizza.page.html',
  styleUrls: ['./show-pizza.page.scss'],
})
export class ShowPizzaPage implements OnInit {

  pizza = Object; 

  constructor(
    private router: Router,
    private customerApiPizza: CustomerApiPizzaService,
    private activatedRoute: ActivatedRoute,
    private modal: ModalComponent
  ) { }

  ngOnInit() {
    this.getPizza();
  }

  getPizza() {
    this.activatedRoute.params.subscribe(params => {   
      let pizzaId = params['id'];
      this.customerApiPizza.getPizza(pizzaId).subscribe(data => {
        this.pizza = data.body.pizza;
      });
    }); 
  }

  async presentModal() {
    this.modal.presentModal(CartModalPage, "cart-modal", this.pizza);
  }

}
