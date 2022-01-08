import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
    declarations: [HeaderComponent, SettingsComponent],
    exports: [HeaderComponent, SettingsComponent]
})

export class ComponentsModule{}