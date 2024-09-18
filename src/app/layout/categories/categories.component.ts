import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestaurantService } from '../restaurant-setup/restaurant.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  files: File[] = [];
  error_msg: string;
  tbl_headers = [
    { 'headerName': 'Category Name', 'headerKey': 'cat_name' },
    { 'headerName': 'Category Logo', 'headerKey': 'cat_img' },
    { 'headerName': 'Created Date', 'headerKey': 'created_date' },
    { 'headerName': 'Modified Date', 'headerKey': 'modified_date' },
    { 'headerName': 'Status', 'headerKey': 'status' }
  ]
  cat_list: any[] = [];
  constructor(private resService: RestaurantService) { }
  ngOnInit() {
    this.getCategories()
  }
  onCreateCategory(form: NgForm) {
    const formData = form.form.value
    this.resService.createCategory(formData.categoryname, this.files, formData.description).subscribe((res: any) => {
      if (res['status']) {
        alert(res['msg'])
        this.getCategories()
      } else {
        alert(JSON.stringify(res))
      }
    })
  }
  getCategories() {
    this.resService.getCategories().subscribe((res: any) => {
      if (res['status']) {
        this.cat_list = res['data'];
      } else {
        this.cat_list = [];
      }
    })
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.files = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
      };
      reader.readAsDataURL(file);
    }
  }

}
