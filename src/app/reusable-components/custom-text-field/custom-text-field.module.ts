import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CustomTextFieldComponent } from './custom-text-field.component';

@NgModule({
  declarations: [
    CustomTextFieldComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [CustomTextFieldComponent]
})
export class CustomTextFieldModule { }
