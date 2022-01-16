import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { expand, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit{

  constructor(private menu: MenuController, 
    private authService: AuthenticationService, 
    private router: Router, 
    private storage: Storage,
    private app: AppComponent
    ) {}
  
  ngOnInit() {
    this.darkTheme();
  }
  
  darkTheme() {
    const toggle = <HTMLInputElement> document.querySelector('#themeToggle');
    let checked = this.app.darkTheme();
    from(checked).subscribe(checked => {  
      if(checked == true) {
        toggle.checked = true;
      }
    })
  
    toggle.addEventListener('ionChange', (ev) => {
      if((<any>ev).detail.checked == true) {
        this.storage.set('dark-mode', true);
      }  else {
        this.storage.set('dark-mode', false);
      }
      document.body.classList.toggle('dark', (<any>ev).detail.checked);
    });
  }


  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true});
  }
}