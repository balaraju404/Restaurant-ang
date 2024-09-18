import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.scss'
})
export class CustomDropdownComponent {
  @Input('dd_model') dd_model: UIDropdown;
  @Output() eventHandlerEmitter = new EventEmitter();

  onChangeEvent(event) {
    this.dd_model['selectedValue'] = event.target.value;
    const index = this.dd_model['dataArr'].findIndex((ele: any) => ele[this.dd_model['valueKey']] == this.dd_model['selectedValue']);
    if (index != -1) {
      this.dd_model['selectedObj'] = this.dd_model['dataArr'][index]
    } else {
      this.dd_model['selectedObj'] = {}
    }
    this.eventHandlerEmitter.emit(this.dd_model);
  }
}
export class UIDropdown {
  public tag: number = 0;
  public labelText: string;
  public dataArr: any[];
  public selectedValue: any = 0;
  public selectedObj: any = {};
  public isDisabled: boolean = false;
  public isMandatory: boolean = false;
  public valueKey: any = 'id';
  public displayKey: any = 'name';
  public customSelectName: string = 'Select';
  public customCssClass:string = '';
  public customCssPrimary:string = '';
  public customCssSecondary:string = '';

  constructor(tag: number, labelTaxt: string, isMandatory: boolean, dataArr: any[]) {
    this.tag = tag;
    this.labelText = labelTaxt;
    this.isMandatory = isMandatory;
    this.dataArr = dataArr
  }
}
