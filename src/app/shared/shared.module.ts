import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MytableComponent } from './mytable/mytable.component'; 
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [ NavbarComponent],
  imports: [
    CommonModule
  ],
  exports:[
    NavbarComponent
   //MytableComponent
  ]
})
export class SharedModule { }
