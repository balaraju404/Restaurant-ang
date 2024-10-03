import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { CustomLoaderComponent } from '../reusable-components/loader/custom-loader.component';

@NgModule({
  declarations: [
    LoginComponent,
    CustomLoaderComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
