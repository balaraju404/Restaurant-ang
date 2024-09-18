import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CustomTableComponent } from './custom-table.component';

@NgModule({
  declarations: [
    CustomTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [CustomTableComponent]
})
export class CustomTableModule { }
