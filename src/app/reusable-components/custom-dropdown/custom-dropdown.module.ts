import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CustomDropdownComponent } from './custom-dropdown.component';

@NgModule({
  declarations: [
    CustomDropdownComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [CustomDropdownComponent]
})
export class CustomDropdownModule { }
