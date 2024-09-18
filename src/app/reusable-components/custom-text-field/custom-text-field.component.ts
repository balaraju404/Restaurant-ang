import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-text-field',
  templateUrl: './custom-text-field.component.html',
  styleUrl: './custom-text-field.component.scss'
})
export class CustomTextFieldComponent {
  @Input('tf_model') tf_model: UITextField
  @Output() eventHandlerEmitter = new EventEmitter();

  onChangeEvent(event) {
    this.tf_model.selectedValue = event.target.value;
    delete this.tf_model['acceptedFormats']
    delete this.tf_model['selectedFile']
    this.eventHandlerEmitter.emit(this.tf_model);
  }
  onFileChangeEvent(event) {
    this.tf_model.selectedFile = event.target.files[0];
    this.eventHandlerEmitter.emit(this.tf_model);
  }
}
export enum InputType {
  Text = 'text',
  Number = 'number',
  Email = 'email',
  Password = 'password',
  File = 'file'
}
export class UITextField {
  public tag: number = 0;
  public labelText: string;
  public type: InputType | string;
  public isMandatory: boolean = false
  public isDisabled: boolean = false;
  public selectedValue: any;
  public selectedFile!: any;
  public acceptedFormats: any;

  constructor(tag: number, labelText: string, type: string, isMandatory: boolean) {
    this.tag = tag;
    this.labelText = labelText
    this.type = type;
    this.isMandatory = isMandatory;
  }
}
