import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { LayoutModule } from './layout/layout.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CustomLoaderModule } from './reusable-components/loader/custom-loader.module';

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    LoginModule,
    LayoutModule,
    CustomLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
