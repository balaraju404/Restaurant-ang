import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurant-setup/restaurant.service';
import { DBManagerService } from '../../../utils/db-manager.service';
import { Constants } from '../../../utils/constants.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SocketService } from '../../webservice/socket-io.service';

@Component({
  selector: 'app-handle-restaurant-orders',
  templateUrl: './handle-restaurant-orders.component.html',
  styleUrls: ['./handle-restaurant-orders.component.scss']
})
export class HandleRestaurantOrdersComponent implements OnInit, OnDestroy {
  isLoading:boolean = false;
  orders_data: any[] = [];
  private ordersSubscription: Subscription;

  constructor(private resService: RestaurantService, private socketService: SocketService) { }

  ngOnInit() {
    this.ordersSubscription = this.socketService.getOrderUpdates().subscribe(data => {
      if (data) {
        const res_id = DBManagerService.getData(Constants.RES_USER_SELECTED_KEY)['res_id']
        if (typeof data == 'string') {
          data = JSON.parse(data);
        }
        if (data['res_id'] == res_id) {
          this.getOrdersData()
          alert('New Order Received')
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
  }

  handleOrder(params, status) {
    params['status'] = status;
    this.isLoading=true;
    this.resService.handleOrder(params).subscribe(
      (res: any) => {
        this.isLoading=false;
        if (res['status']) {
          alert(res['msg']);
          this.getOrdersData();
        } else {
          alert(res['msg'] || JSON.stringify(res));
        }
      },
      (error) => {
        this.isLoading=false;
        console.error('Error handling order', error);
        alert('An error occurred while handling the order.');
      }
    );
  }

  getOrdersData() {
    const res_id = DBManagerService.getData(Constants.RES_USER_SELECTED_KEY)['res_id'];
    const params = { 'res_id': res_id, status: 1 };
    this.isLoading=true
    this.resService.getResOrders(params).subscribe(
      (res: any) => {
        this.isLoading=false;
        if (res['status']) {
          this.orders_data = res['data'];
        }
      },
      (error) => {
        this.isLoading=false;
        console.error('Error fetching orders data', error);
        alert(JSON.stringify(error))
      }
    );
  }
}
