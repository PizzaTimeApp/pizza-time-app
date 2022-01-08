import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private menu: MenuController, private authService: AuthenticationService, private router: Router) {}
  
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true});
  }
  ngOnInit() {}

  openFirst() {
    console.log("dfsf");
    this.menu.enable(true, 'settings');
    this.menu.open('settings');
  }
}