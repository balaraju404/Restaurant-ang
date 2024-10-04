import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../restaurant-setup/restaurant.service';
import { DBManagerService } from '../../../utils/db-manager.service';
import { Constants } from '../../../utils/constants.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss'
})
export class RestaurantComponent {
  isLoading: boolean = false
  productViewStatus:boolean=false
  selectedProductData: any = null
  res_id: any;
  restaurant_data: any = {}
  restaurant_categories: any = []
  restaurant_products: any = []

  constructor(private router: Router, private route: ActivatedRoute, private resService: RestaurantService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.res_id = params['res_id']
      this.getRestaurant();
      this.getResCategories();
      this.getResProducts();
    })
  }
  getRestaurant() {
    this.isLoading = true
    this.resService.getRestaurant(this.res_id).subscribe((res) => {
      this.isLoading = false
      if (res['status']) {
        this.restaurant_data = res['data']
      }
    }, error => {
      this.isLoading = false
      alert(JSON.stringify(error))
    })
  }
  getResCategories() {
    this.isLoading = true
    this.resService.getResCategories(this.res_id).subscribe((res: any) => {
      this.isLoading = false
      if (res['status']) {
        this.restaurant_categories = res['data'];
      } else {
        this.restaurant_categories.dataArr = [];
      }
    }, error => {
      this.isLoading = false
      alert(JSON.stringify(error))
    })
  }
  getResProducts() {
    const params = { 'res_id': this.res_id }
    this.isLoading = true
    this.resService.getResProducts(params).subscribe((res: any) => {
      this.isLoading = false
      if (res['status']) {
        this.restaurant_products = res['data'];
        this.getUserCartData()
      }
    }, error => {
      this.isLoading = false
      alert(JSON.stringify(error))
    })
  }
  modifyProductsData(data: any[]) {
    this.restaurant_products.map((item: any) => {
      const index = data.findIndex((ele: any) => ele['res_id'] == item['res_id'] && ele['product_id'] == item['product_id'])
      if (index != - 1) {
        item['product_qty'] = data[index]['product_qty'];
      } else {
        item['product_qty'] = 1;
      }
    })

  }
  onSearch(event: string) {

  }
  checkCategory(cat_id: any) {
    const index = this.restaurant_products.findIndex((item: any) => item['cat_id'] == cat_id);
    return index != -1
  }
  handleQuantity(item: any, value: number) {
    // Decrease quantity
    if (value === 0) {
      if (item['product_qty'] <= 1) {
        return alert('The minimum quantity is 1. You cannot decrease it further.');
      }
      item['product_qty'] -= 1;
    }
    // Increase quantity
    else if (value === 1) {
      if (item['product_qty'] >= 5) {
        return alert('The maximum quantity allowed is 5.');
      }
      item['product_qty'] += 1;
    }
  }
  viewProduct(item: any) {
    console.log(item);
    this.productViewStatus=true
    this.selectedProductData = item;
  }
  closeProduct(event:any){
    this.productViewStatus=false
    this.selectedProductData = null;
  }

  postCartData(item: any) {
    const user_id = DBManagerService.getData(Constants.USER_DATA_KEY)['user_id'];
    const params = { user_id: user_id, res_id: item['res_id'], cat_id: item['cat_id'], product_id: item['product_id'], product_qty: item['product_qty'], status: 1 };
    this.isLoading = true
    this.resService.postCartData(params).subscribe((res: any) => {
      this.isLoading = false
      if (res['status']) {
        this.getUserCartData()
        alert(res['msg'])
      } else {
        alert(res['msg'] || JSON.stringify(res))
      }
    }, error => {
      this.isLoading = false
      alert(error.message || JSON.stringify(error))
    })
  }
  getUserCartData() {
    const user_id = DBManagerService.getData(Constants.USER_DATA_KEY)['user_id'];
    const params = { user_id: user_id, res_id: this.res_id };
    this.isLoading = true
    this.resService.getUserCartData(params).subscribe((res: any) => {
      this.isLoading = false
      if (res['status']) {
        this.modifyProductsData(res['data'])
      }
    }, error => {
      this.isLoading = false
      alert(error.message || JSON.stringify(error))
    })
  }
}
