import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RefresherComponent } from 'src/app/components/refresher/refresher.component';
import { CustomerApiOrderService } from '../../../../../../api/order/customer/customer-api-order.service';
import { OrderReservation } from '../../../../../models/OrderReservation';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders = null;
  dataFilter = null;

  constructor(
    private customerApiOrder: CustomerApiOrderService,
    private refresher: RefresherComponent
  ) { }

  ngOnInit() {
    this.getMyOrders();    
  }

  getMyOrders(){ 
    this.customerApiOrder.getMyOrders(null, null, this.dataFilter).subscribe(data => {
      this.orders = data.body.orderReservation;       
    })
  }

  doRefresh(event) {
    this.refresher.doRefresh(event, 2000);
    this.ngOnInit();
  }
}
