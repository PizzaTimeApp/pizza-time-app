import { Component, OnInit } from '@angular/core';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';
import { RefresherComponent } from '../../../../components/refresher/refresher.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  openModal = true;

  newPizza = Object;
  momentPizzas = null;
  slideOpt ={
    direction: 'horizontal',
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
    }
  }

  constructor(
    private customerApiPizza: CustomerApiPizzaService,
    private refresher: RefresherComponent
  ) {}

  ngOnInit() {
    this.getNewPizza();
    this.getMomentPizzas();
  }
  
  async getNewPizza() {
    this.customerApiPizza.getPizzas("admin", 1).subscribe(data => {
      this.newPizza = data.body.pizzas[0];      
    })
  }

  getMomentPizzas(){
    this.customerApiPizza.getPizzas("admin", 10).subscribe(data => {
      if( data.body.pizzas.length >= 1){
        this.momentPizzas = data.body.pizzas; 
      } else {
        this.momentPizzas == null;
      }
    })
  }

  doRefresh(event) {
    this.refresher.doRefresh(event, 2000);
    this.ngOnInit();
  }
}
