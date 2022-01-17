import { Component, OnInit, Input } from '@angular/core';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';

@Component({
  selector: 'app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss'],
})
export class CardImageComponent implements OnInit {

  @Input() pizza;

  constructor(
    private customerApiPizza: CustomerApiPizzaService,
  ) { }

  ngOnInit() {}

  getImagePizza(image:any) {
    return this.customerApiPizza.getImagePizza(image);
  }

}
