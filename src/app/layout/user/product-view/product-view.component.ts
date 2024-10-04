import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'] // Fixed styleUrl to styleUrls
})
export class ProductViewComponent implements OnInit {
  @Input() productData: any = {};
  @Output() closeEmitter = new EventEmitter<void>();

  curImg: string | undefined;
  imgsLength: number = 0;
  curIndex: number = 0;

  ngOnInit() {
    console.log(this.productData);
    this.imgsLength = this.productData?.['images']?.length || 0;
    this.updateCurrentImage();
  }

  closeModal() {
    this.productData = null;
    this.closeEmitter.emit();
  }

  incImg() {
    if (this.imgsLength > 0) {
      this.curIndex = (this.curIndex + 1) % this.imgsLength;
      this.updateCurrentImage();
    }
  }

  decImg() {
    if (this.imgsLength > 0) {
      this.curIndex = (this.curIndex - 1 + this.imgsLength) % this.imgsLength;
      this.updateCurrentImage();
    }
  }

  private updateCurrentImage() {
    if (this.productData?.['images'] && this.imgsLength > 0) {
      this.curImg = this.productData['images'][this.curIndex]['image'];
    }
  }
}
