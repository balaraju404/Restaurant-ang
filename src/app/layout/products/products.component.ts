import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestaurantService } from '../restaurant-setup/restaurant.service';
import { DBManagerService } from '../../utils/db-manager.service';
import { Constants } from '../../utils/constants.service';
import { UIDropdown } from '../../reusable-components/custom-dropdown/custom-dropdown.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  isLoading: boolean = false;
  product_img: File[] = []
  images: File[] = [];
  error_msg: string;
  dd_mdl_categories!: UIDropdown
  tbl_headers = [
    { 'headerName': 'Category Name', 'headerKey': 'cat_name' },
    { 'headerName': 'Product Name', 'headerKey': 'product_name' },
    { 'headerName': 'Product Logo', 'headerKey': 'product_img' },
    { 'headerName': 'Price', 'headerKey': 'price' },
    { 'headerName': 'Description', 'headerKey': 'description' },
    { 'headerName': 'Created Date', 'headerKey': 'created_date' },
    { 'headerName': 'Modified Date', 'headerKey': 'modified_date' },
    { 'headerName': 'Status', 'headerKey': 'status' }
  ]
  table_data: any[] = [];

  constructor(private resService: RestaurantService) { }

  ngOnInit() {
    this.setupFields()
    this.getResCategories()
    this.getProducts()
  }
  setupFields() {
    this.dd_mdl_categories = new UIDropdown(1, '', false, []);
    this.dd_mdl_categories['selectedValue'] = -1;
    this.dd_mdl_categories.valueKey = 'cat_id';
    this.dd_mdl_categories.displayKey = 'cat_name';
  }
  getResCategories() {
    const selectedData = DBManagerService.getData(Constants.RES_USER_SELECTED_KEY)
    const res_id = selectedData['res_id']
    this.isLoading = true
    this.resService.getResCategories(res_id).subscribe((res: any) => {
      this.isLoading = false
      if (res['status']) {
        this.dd_mdl_categories.dataArr = res['data'];
      } else {
        this.dd_mdl_categories.dataArr = [];
      }
    }, error => {
      this.isLoading = false
      alert(JSON.stringify(error))
    })
  }
  onCreateProducts(form: NgForm) {
    const selectedData = DBManagerService.getData(Constants.RES_USER_SELECTED_KEY)
    const formData = form.form.value
    const res_id = selectedData['res_id']
    const cat_id = this.dd_mdl_categories['selectedValue']
    const product_name = formData.productName
    const price = formData.price
    const description = formData.description
    const images = [this.product_img, ...this.images]
    this.isLoading = true
    this.resService.createResProduct(res_id, cat_id, product_name, images, price, description).subscribe((res: any) => {
      this.isLoading = false
      if (res['status']) {
        alert(res['msg'])
        this.getProducts()
      } else {
        alert(JSON.stringify(res))
      }
    }, error => {
      this.isLoading = false
      alert(JSON.stringify(error))
    })
  }
  getProducts() {
    const selectedData = DBManagerService.getData(Constants.RES_USER_SELECTED_KEY)
    const params = { 'res_id': selectedData['res_id'] }
    this.isLoading = true
    this.resService.getResProducts(params).subscribe((res: any) => {
      if (res['status']) {
        this.table_data = res['data'];
      } else {
        this.table_data = [];
      }
    }, error => {
      this.isLoading = false
      alert(JSON.stringify(error))
    })
  }
  onMultipleFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.images = Array.from(event.target.files);
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product_img = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
      };
      reader.readAsDataURL(file);
    }
  }
  eventHandler(event: any) {
  }
}
