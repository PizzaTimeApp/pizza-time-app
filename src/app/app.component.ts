import { Component, Renderer2 } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  constructor(
    private storage: Storage,
    private renderer: Renderer2
    ) {
      this.darkTheme();
    }


  async darkTheme():Promise<boolean> {
    if(this.storage.get('dark-mode')) {
      let darkTheme  = await this.storage.get('dark-mode'); 
      if(darkTheme == true) {
        this.renderer.addClass(document.body, 'dark');
        return true;  

      } else {
        this.renderer.removeClass(document.body, 'dark');
        return false 
      }
    } else {
      this.storage.set('dark-mode', false);
    }
  }
}
