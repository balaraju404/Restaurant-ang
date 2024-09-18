import { Component } from '@angular/core';
import { RestaurantService } from '../../restaurant-setup/restaurant.service';
import { DBManagerService } from '../../../utils/db-manager.service';
import { Constants } from '../../../utils/constants.service';
import { SocketService } from '../../webservice/socket-io.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  userCartData: any[] = []

  constructor(private resService: RestaurantService,private socketService: SocketService) { }

  ngOnInit() {
    this.getUserCartData()
  }

  getUserCartData() {
    const user_id = DBManagerService.getData(Constants.USER_DATA_KEY)['user_id']
    const params = { 'user_id': user_id, 'status': 1 }
    this.resService.getUserCartData(params).subscribe((res: any) => {
      if (res['status']) {
        this.userCartData = res['data'];
      }
    })
  }
  getTotalPrice() {
    return this.userCartData.reduce((total, item) => total + (item['price'] * item['product_qty']), 0);
  }
  handleQuantity(item: any, value: number) {
    if (value === 0) {
      if (item['product_qty'] <= 1) {
        return alert('The minimum quantity is 1. You cannot decrease it further.');
      }
      item['product_qty'] -= 1;
      this.updateCartData(item)
    }
    else if (value === 1) {
      if (item['product_qty'] >= 5) {
        return alert('The maximum quantity allowed is 5.');
      }
      item['product_qty'] += 1;
      this.updateCartData(item)
    }
  }
  updateCartData(item: any) {
    const user_id = DBManagerService.getData(Constants.USER_DATA_KEY)['user_id'];
    const params = { cart_id: item['cart_id'], user_id: user_id, res_id: item['res_id'], cat_id: item['cat_id'], product_id: item['product_id'], product_qty: item['product_qty'], status: 1 };
    this.resService.updateCartData(params).subscribe((res: any) => {
      if (res['status']) {
        this.getUserCartData()
        alert(res['msg'])
      } else {
        alert(res['msg'] || JSON.stringify(res))
      }
    })
  }
  deleteItem(cart_id: any) {
    if (!confirm('Are you sure , you want to delete item ?')) {
      return
    }
    this.resService.deleteCartItem(cart_id).subscribe((res: any) => {
      if (res['status']) {
        this.getUserCartData()
        alert(res['msg'])
      } else {
        alert(res['msg'] || JSON.stringify(res))
      }
    })
  }
  placeOrder() {
    const user_id = DBManagerService.getData(Constants.USER_DATA_KEY)['user_id'];
    const res_id = this.userCartData[0]['res_id'];
    const total_price = this.userCartData.reduce((total, item) => total + (item['price'] * item['product_qty']), 0);

    const products_data = this.userCartData.map((item: any) => {
      return { cart_id: item['cart_id'], product_id: item['product_id'], product_qty: item['product_qty'] };
    });

    const params = { 'user_id': user_id, 'res_id': res_id, 'total_price': total_price, 'products_data': products_data, 'status': 1 };

    this.resService.sendOrderRequest(params).subscribe((res: any) => {
      if (res['status']) {
        this.socketService.sendOrderData(params);
        this.getUserCartData()
        alert(res['msg']);
      } else {
        alert(res['msg'] || JSON.stringify(res));
      }
    });
  }
  getcurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude, position.coords.longitude)
    })
  }
}
