import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'customer-tabs.page.html',
  styleUrls: ['customer-tabs.page.scss']
})
export class CustomerTabsPage {

  cartCounter = null;
  
  constructor(
    private router: Router,
  ) {}

  ngOnInit() {   
  }

  updateCartCounter(input: number) {
    this.cartCounter = input;
  }

}
