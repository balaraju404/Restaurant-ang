import { Component } from '@angular/core';
import { DBManagerService } from '../../utils/db-manager.service';
import { Constants } from '../../utils/constants.service';
import { RestaurantService } from '../restaurant-setup/restaurant.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  isLoading: boolean = false
  orders_data: any[] = []
  roleId: any;
  params: any = {}
  constructor(private resService: RestaurantService) { }
  ngOnInit() {
    this.roleId = DBManagerService.getData(Constants.USER_DATA_KEY)['role_id']
    this.getOrdersData()
  }

  getOrdersData() {
    if (this.roleId == 3) {
      this.params['user_id'] = DBManagerService.getData(Constants.USER_DATA_KEY)['user_id']
    } else if (this.roleId == 2 || this.roleId == 4) {
      this.params['res_id'] = DBManagerService.getData(Constants.RES_USER_SELECTED_KEY)['res_id']
    }
    this.isLoading = true
    this.resService.getResOrders(this.params).subscribe((res: any) => {
      this.isLoading = false
      if (res['status']) {
        this.orders_data = res['data']
      }
    }, error => {
      this.isLoading = false
      alert(JSON.stringify(error))
    })
  }
  handleOrder(params, status) {
    params['status'] = status
    this.isLoading = true
    this.resService.handleOrder(params).subscribe((res: any) => {
      this.isLoading = false
      if (res['status']) {
        alert(res['msg'])
        this.getOrdersData()
      } else {
        alert(res['msg'] || JSON.parse(res))
      }
    }, error => {
      this.isLoading = false
      alert(JSON.stringify(error))
    })
  }
}
