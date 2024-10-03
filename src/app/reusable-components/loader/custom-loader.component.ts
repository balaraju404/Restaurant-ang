import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-loader',
  templateUrl: './custom-loader.component.html',
  styleUrl: './custom-loader.component.scss'
})
export class CustomLoaderComponent {
  @Input('isLoader') isLoader: boolean = false;
}
