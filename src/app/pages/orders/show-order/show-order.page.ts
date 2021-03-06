import { Component, OnInit } from '@angular/core';
import { CustomerApiOrderService } from '../../../../api/order/customer/customer-api-order.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.page.html',
  styleUrls: ['./show-order.page.scss'],
})
export class ShowOrderPage implements OnInit {

  myOrder = Object; 
  
  constructor(
    private customerApiOrder: CustomerApiOrderService,
    private customerApiPizza: CustomerApiPizzaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getMyOrder();
  }
  
  getMyOrder() {
    this.activatedRoute.params.subscribe(params => {   
      let orderId = params['id'];
      this.customerApiOrder.getMyOrder(orderId).subscribe(data => {
        this.myOrder = data.body.order[0];
        console.log(this.myOrder);   
      });
    });
  }

  getImagePizza(image:any) {
    return this.customerApiPizza.getImagePizza(image);
  }

}
