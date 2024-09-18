import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrl: './custom-checkbox.component.scss'
})
export class CustomCheckboxComponent {
  @Input('chkbox_mdl') chkbox_mdl: UICheckbox;
  @Output() eventHandlerEmitter = new EventEmitter();

  onCheckEvent(event, obj) {
    const isChecked = event.target.checked;
    const selectedValue = event.target.value;
    if (isChecked) {
      this.chkbox_mdl.selectedValue.push(selectedValue)
      this.chkbox_mdl.selectedArr.push(obj)
    } else {
      const index = this.chkbox_mdl.selectedValue.findIndex(value => value == selectedValue)
      if (index != -1) {
        this.chkbox_mdl.selectedValue.splice(index, 1)
        this.chkbox_mdl.selectedArr.splice(index, 1)
      }
    }
    this.chkbox_mdl.checked = isChecked;
    this.chkbox_mdl.selectedObj = obj
    this.eventHandlerEmitter.emit(this.chkbox_mdl)
  }
  isSelected(value, obj): boolean {
    const status = this.chkbox_mdl.selectedValue.includes(value);
    if (status) {
      const index = this.chkbox_mdl.selectedArr.findIndex(ele => ele[this.chkbox_mdl['valueKey']] == value)
      if (index == -1) {
        this.chkbox_mdl.selectedArr.push(obj)
      }
    }
    return status
  }
}
export class UICheckbox {
  public tag: number = 0;
  public labelText: string;
  public dataArr: any[];
  public selectedValue: any[] = [];
  public selectedArr: any[] = [];
  public selectedObj: any = {};
  public isDisabled: boolean = false;
  public isMandatory: boolean = false;
  public valueKey: any = 'id';
  public displayKey: any = 'name';
  public checked: boolean = false;

  constructor(tag: number, labelTaxt: string, isMandatory: boolean, dataArr: any[]) {
    this.tag = tag;
    this.labelText = labelTaxt;
    this.isMandatory = isMandatory;
    this.dataArr = dataArr
  }
}
