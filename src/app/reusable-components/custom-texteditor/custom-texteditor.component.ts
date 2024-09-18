import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { UIDropdown } from '../custom-dropdown/custom-dropdown.component';

@Component({
  selector: 'app-custom-texteditor',
  templateUrl: './custom-texteditor.component.html',
  styleUrls: ['./custom-texteditor.component.scss']
})
export class CustomTexteditorComponent implements OnInit {
  @Input('txt_editor_mdl') txt_editor_mdl!: UITextEditor;
  @Output() eventEmitter = new EventEmitter();

  @ViewChild('editor') editor!: ElementRef;

  fontSizes = [
    { id: 1, value: '10px' },
    { id: 2, value: '13px' },
    { id: 3, value: '16px' },
    { id: 4, value: '18px' },
    { id: 5, value: '24px' },
    { id: 6, value: '32px' },
    { id: 7, value: '48px' }
  ];
  headings = [
    { name: 'Heading 1', id: 'h1', },
    { name: 'Heading 2', id: 'h2', },
    { name: 'Heading 3', id: 'h3', },
    { name: 'Heading 4', id: 'h4', },
    { name: 'Heading 5', id: 'h5', },
    { name: 'Heading 6', id: 'h6', },
    { name: 'Paragraph', id: 'p', },
    { name: 'Predefined', id: 'pre' },
    { name: 'Standard', id: 'div' },
    { name: 'default', id: 'default' }
  ];

  dd_mdl_fontsize!: UIDropdown;
  dd_mdl_headings!: UIDropdown;

  constructor() { }

  ngOnInit() {
    this.setupComponents();
  }

  setupComponents() {
    this.dd_mdl_fontsize = new UIDropdown(1, '', false, this.fontSizes);
    this.dd_mdl_fontsize.selectedValue = 1;
    this.dd_mdl_fontsize.displayKey = 'value';
    this.dd_mdl_fontsize.customSelectName = '';
    this.dd_mdl_fontsize.customCssSecondary = 'custom-drpdwn-primary';

    this.dd_mdl_headings = new UIDropdown(2, '', false, this.headings);
    this.dd_mdl_headings.selectedValue = 'default';
    this.dd_mdl_headings.displayKey = 'name';
    this.dd_mdl_headings.customSelectName = '';
    this.dd_mdl_headings.customCssSecondary = 'custom-drpdwn-primary';
  }

  onChangeEvent() {
    this.txt_editor_mdl.selectedInnerHtml = this.editor.nativeElement.innerHTML
    this.txt_editor_mdl.selectedText = this.editor.nativeElement.innerText
    this.txt_editor_mdl.selectedValue = this.editor.nativeElement.innerText
    this.eventEmitter.next(this.txt_editor_mdl)
  }

  changeFontSize(event: any) {
    const fontSize = event['selectedValue'];
    document.execCommand('fontSize', false, fontSize)
  }
  changeHeading(event: any) {
    const tagName = event['selectedValue'];
    document.execCommand('formatBlock', false, tagName)
  }

  execCommand(command: string) {
    document.execCommand(command);
  }
}

export class UITextEditor {
  public tag: number = 0;
  public labelText: string = '';
  public isMandatory: boolean = false;
  public selectedValue: any;
  public selectedInnerHtml: any;
  public selectedText: any;
  public customCssClass: string = '';

  constructor(tag: number, text: string, isMandatory: boolean) {
    this.tag = tag;
    this.labelText = text;
    this.isMandatory = isMandatory;
  }
}
