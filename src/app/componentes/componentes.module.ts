import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTabComponent } from './header-tab/header-tab.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [HeaderTabComponent],//Declaramos nuestro componente
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderTabComponent] // exportamos nuestro componente
})
export class ComponentesModule { }
