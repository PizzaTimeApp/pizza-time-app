import { Component, OnInit, Input } from '@angular/core';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() pizza;

  constructor(
    private customerApiPizza: CustomerApiPizzaService,
  ) { }

  ngOnInit() {}

  getImagePizza(image:any) {
    return this.customerApiPizza.getImagePizza(image);
  }
}
