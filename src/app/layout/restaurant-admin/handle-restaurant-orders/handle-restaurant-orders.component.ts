import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurant-setup/restaurant.service';
import { DBManagerService } from '../../../utils/db-manager.service';
import { Constants } from '../../../utils/constants.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-handle-restaurant-orders',
  templateUrl: './handle-restaurant-orders.component.html',
  styleUrls: ['./handle-restaurant-orders.component.scss']
})
export class HandleRestaurantOrdersComponent implements OnInit, OnDestroy {
  orders_data: any[] = [];
  private ordersSubscription: Subscription;

  constructor(private resService: RestaurantService) { }

  ngOnInit() {
    this.startPolling();
  }

  ngOnDestroy() {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
  }

  startPolling() {
    const res_id = DBManagerService.getData(Constants.RES_USER_SELECTED_KEY)['res_id'];
    const params = { 'res_id': res_id, status: 1 };

    this.ordersSubscription = interval(2000).pipe(
      switchMap(() => this.resService.getResOrders(params))
    ).subscribe(
      (res: any) => {
        if (res['status']) {
          this.orders_data = res['data'];
        }
      },
      (error) => {
        console.error('Error fetching orders data', error);
      }
    );
  }

  handleOrder(params, status) {
    params['status'] = status;
    this.resService.handleOrder(params).subscribe(
      (res: any) => {
        if (res['status']) {
          alert(res['msg']);
          this.getOrdersData();
        } else {
          alert(res['msg'] || JSON.stringify(res));
        }
      },
      (error) => {
        console.error('Error handling order', error);
        alert('An error occurred while handling the order.');
      }
    );
  }

  getOrdersData() {
    const res_id = DBManagerService.getData(Constants.RES_USER_SELECTED_KEY)['res_id'];
    const params = { 'res_id': res_id, status: 1 };

    this.resService.getResOrders(params).subscribe(
      (res: any) => {
        if (res['status']) {
          this.orders_data = res['data'];
        }
      },
      (error) => {
        console.error('Error fetching orders data', error);
      }
    );
  }
}
