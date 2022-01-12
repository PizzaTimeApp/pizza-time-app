import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { CardImageComponent } from './cards/card-img/card-img.component';
import { RefresherComponent } from './refresher/refresher.component';
import { CardComponent } from './cards/card/card.component'; 

@NgModule({
    declarations: [HeaderComponent, SettingsComponent, CardImageComponent, CardComponent, RefresherComponent],
    exports: [HeaderComponent, SettingsComponent, CardImageComponent, CardComponent, RefresherComponent]
})

export class ComponentsModule{}