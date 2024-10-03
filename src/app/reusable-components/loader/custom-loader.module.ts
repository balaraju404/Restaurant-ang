import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CustomLoaderComponent } from './custom-loader.component';


@NgModule({
  declarations: [
    CustomLoaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [CustomLoaderComponent]
})
export class CustomLoaderModule { }
