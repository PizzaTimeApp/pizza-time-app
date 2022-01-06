import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss']
})
export class SettingPage {

  constructor(private authService: AuthenticationService, private router: Router) {}
  
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true});
  }

}
