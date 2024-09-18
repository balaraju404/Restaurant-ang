import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CustomTexteditorComponent } from './custom-texteditor.component';
import { CustomDropdownModule } from '../custom-dropdown/custom-dropdown.module';

@NgModule({
  declarations: [
    CustomTexteditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomDropdownModule
  ],
  exports: [CustomTexteditorComponent]
})
export class CustomTextEditorModule { }
