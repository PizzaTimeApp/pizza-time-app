import { Component, OnInit } from '@angular/core';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';
import { HeaderComponent } from '../../../../components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  pizzas = null;

  constructor(
    private customerApiPizza: CustomerApiPizzaService
  ) {}

  ngOnInit() {
    this.customerApiPizza.getPizzas().subscribe(data => {
      this.pizzas = data.body.pizzas;
      console.log(this.pizzas);
      
    })
  }
}
