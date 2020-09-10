import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UsersModule } from './users/users.module';
import {DashboardModule } from './dashboard/dashboard.module';
import { ErrorsModule } from './errors/errors.module';
//import { SharedModule } from './shared/shared.module';
//import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    DashboardModule,
    FormsModule,
    AngularEditorModule,
    ErrorsModule,
    UsersModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:'toast-top-right',
      preventDuplicates:true
    })


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
