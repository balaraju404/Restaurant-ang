import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CustomCheckboxComponent } from './custom-checkbox.component';

@NgModule({
  declarations: [
    CustomCheckboxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [CustomCheckboxComponent]
})
export class CustomCheckboxModule { }
