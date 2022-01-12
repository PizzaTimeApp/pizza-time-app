import { Component, OnInit } from '@angular/core';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';
import { RefresherComponent } from '../../../../components/refresher/refresher.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  newPizza = null;
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
  
  getNewPizza() {
    this.customerApiPizza.getPizzas("admin", 1).subscribe(data => {
      this.newPizza = data.body.pizzas;
    })
  }

  getMomentPizzas(){
    this.customerApiPizza.getPizzas("admin", 10).subscribe(data => {
      this.momentPizzas = data.body.pizzas;      
    })
  }

  doRefresh(event) {
    this.refresher.doRefresh(event, 2000);
    this.ngOnInit();
  }
}
