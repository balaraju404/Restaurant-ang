import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../restaurant-setup/restaurant.service';
import { DBManagerService } from '../../utils/db-manager.service';
import { Constants } from '../../utils/constants.service';
import { UIDropdown } from '../../reusable-components/custom-dropdown/custom-dropdown.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  res_user_status :boolean;
  username: string;
  role_id: number;
  resLogo: string;
  resName: string;

  dd_mdl_restaurants!: UIDropdown;

  constructor(private router: Router, private resService: RestaurantService) { }

  ngOnInit() {
    const userData = DBManagerService.getData(Constants.USER_DATA_KEY)
    this.username = userData['user_name']
    this.role_id = userData['role_id']
    this.res_user_status = Constants.isRestaurantUsers();
    this.setupFields()
    if (this.role_id == 2 || this.role_id == 4) {
      this.getUserRestaurants()
    }
  }
  getUserRestaurants() {
    const user_id = DBManagerService.getData(Constants.USER_DATA_KEY)['user_id']
    this.resService.getUserRestaurants(user_id).subscribe((res: any) => {
      if (res['status']) {
        this.dd_mdl_restaurants.dataArr = res['data']
        this.dd_mdl_restaurants['selectedValue'] = this.dd_mdl_restaurants['dataArr'][0][this.dd_mdl_restaurants['valueKey']]
        this.dd_mdl_restaurants['selectedObj'] = this.dd_mdl_restaurants['dataArr'][0]
        const obj = this.dd_mdl_restaurants['selectedObj']
        DBManagerService.setData(obj, Constants.RES_USER_SELECTED_KEY);
        this.resLogo = obj['res_logo'];
        this.resName = obj['restaurant_name']
      }
    })
  }
  setupFields() {
    this.dd_mdl_restaurants = new UIDropdown(1, '', false, []);
    this.dd_mdl_restaurants['selectedValue'] = -1;
    this.dd_mdl_restaurants.valueKey = 'res_id';
    this.dd_mdl_restaurants.displayKey = 'restaurant_name';
    this.dd_mdl_restaurants.customSelectName = 'Select Restaurant'
  }
  eventHandler(event: any) {
    const tag = event['tag']
    if (tag == 1) {
      const obj = event['selectedObj']
      DBManagerService.setData(obj, Constants.RES_USER_SELECTED_KEY);
      this.resLogo = obj['res_logo'];
      this.resName = obj['restaurant_name']
    }
  }

  onLogout() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
