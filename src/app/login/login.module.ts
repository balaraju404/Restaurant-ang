import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { CustomLoaderModule } from '../reusable-components/loader/custom-loader.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule,
    CustomLoaderModule
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
