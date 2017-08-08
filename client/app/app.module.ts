import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';

import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports:      [
      BrowserModule,
      HttpModule,
      FormsModule,
      RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  declarations: [
      AppComponent,
      AboutComponent,
      HomeComponent,
      NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
