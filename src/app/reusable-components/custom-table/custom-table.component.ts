import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent {
  @Input('tbl_mdl') tbl_mdl: UITable
  @Output() eventHandlerEmitter = new EventEmitter();
  @Output() allCheckboxEventEmitter = new EventEmitter();

  isAllChecked(columnKey: string): boolean {
    return this.tbl_mdl.dataArr
      .filter((obj: any) => !obj['chkbox_mdl_' + columnKey]?.isDisabled)
      .every((obj: any) => obj['chkbox_mdl_' + columnKey]?.checked);
  }

  allCheckboxEvent(event:any, tag: any) {
    event.target['tag'] = tag
    this.allCheckboxEventEmitter.emit(event.target);
  }
  onChangeEvent(event: any, index: number) {
    this.tbl_mdl['selectedObj'] = this.tbl_mdl['dataArr'][index]
    this.eventHandlerEmitter.emit(this.tbl_mdl)
  }
}
export enum UITableActionEvent {
  None = 0,
  Edit = 1,
  Delete = 2,
  View = 3,
  Other = 4,
}
export enum UITableInputTypes {
  None = 0,
  Checkbox = 1,
  Radiobutton = 2,
  Dropdown = 3
}
export class UITableHeaders {
  public headerName: string = "";
  public headerIcon: string = "";
  public columnKey: [string] | any = [];
  public isOnlyIcon: boolean = false;
  public actionEvent: UITableActionEvent = UITableActionEvent.None;
  public buttonText: string = "";
  public tag: number;
  public inputElement: number = UITableInputTypes.None
  public btnElement: number = 0;
  public customCssClass: string = ""
  public isDisabled: boolean = false;
  public isMandatory: boolean = false
  public isChecked: boolean = false;
  public isHeaderChkbox: boolean = false;
  constructor(headerName: string,
    columnKey: any,
    headerIcon: string = "",
    isOnlyIcon: boolean = false,
    actionEvent: UITableActionEvent = UITableActionEvent.None,
    buttonText: string = "",
    tag: number = 0
  ) {
    this.headerName = headerName;
    this.headerIcon = headerIcon;
    this.columnKey = columnKey;
    this.isOnlyIcon = isOnlyIcon;
    this.actionEvent = actionEvent;
    this.buttonText = buttonText;
    this.tag = tag;
  }
  public static withHeaderIcon(headerIcon: string, actionEvent: UITableActionEvent = UITableActionEvent.None) {
    return new UITableHeaders("", [], headerIcon, true, actionEvent);
  }
  public static withButton(btnText: string, btnStyle: string, tag: number) {
    return new UITableHeaders("", [], "", false, UITableActionEvent.Other, btnText, tag);
  }
}
export class UITable {
  public tableTag: number = 0
  public tableTitle: string = ""
  public dataArr: any = []
  public tableHeaders: [UITableHeaders] | any = []
  public colSpan: number = 0;
  public countCustomClass: string = '';
  public isShownRightCont: boolean = false
  public titleRightCont: string | any = []
  public titleMiddleCont: string | any = []
  public isFullWidth: boolean = false
  constructor(tableTag: number, headers: any, dataArr: any) {
    this.tableTag = tableTag
    this.tableHeaders = headers
    this.dataArr = dataArr
  }
}
