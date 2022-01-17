import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private menu: MenuController, private authService: AuthenticationService, private router: Router) {}
  

  ngOnInit() {}

   
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true});
  }

  openMainContent() {
    this.menu.enable(true, 'main-content');
    this.menu.open('main-content');
  }
}
