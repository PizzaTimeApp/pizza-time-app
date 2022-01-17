import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'admin-tabs.page.html',
  styleUrls: ['admin-tabs.page.scss']
})
export class AdminTabsPage {
  
  constructor(
    private router: Router,
  ) {}

  ngOnInit() {   
  }


}
