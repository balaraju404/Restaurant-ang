import { Component } from '@angular/core';
import { UIDropdown } from '../../reusable-components/custom-dropdown/custom-dropdown.component';
import { RestaurantService } from '../restaurant-setup/restaurant.service';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-assign-restaurant-user',
  templateUrl: './assign-restaurant-user.component.html',
  styleUrl: './assign-restaurant-user.component.scss'
})
export class AssignRestaurantUserComponent {
  isLoading:boolean = false;
  roles = [
    { 'role_id': 2, 'role_name': 'Restaurant Admin' },
    { 'role_id': 4, 'role_name': 'Restaurant User' }
  ]
  dd_mdl_restaurants!: UIDropdown;
  dd_mdl_users!: UIDropdown;
  dd_mdl_role!: UIDropdown;

  constructor(private resService: RestaurantService, private loginService: LoginService) { }

  ngOnInit() {
    this.setUpFields()
    this.getRestaurants()
    this.getUsers()
  }
  setUpFields() {
    this.dd_mdl_restaurants = new UIDropdown(1, 'Restaurants', false, []);
    this.dd_mdl_restaurants['selectedValue'] = -1;
    this.dd_mdl_restaurants.valueKey = 'res_id';
    this.dd_mdl_restaurants.displayKey = 'restaurant_name';

    this.dd_mdl_users = new UIDropdown(2, 'Users', false, []);
    this.dd_mdl_users['selectedValue'] = -1;
    this.dd_mdl_users.valueKey = 'user_id';
    this.dd_mdl_users.displayKey = 'user_name';

    this.dd_mdl_role = new UIDropdown(3, 'Role', false, this.roles);
    this.dd_mdl_role['selectedValue'] = -1;
    this.dd_mdl_role.valueKey = 'role_id';
    this.dd_mdl_role.displayKey = 'role_name';
  }
  getRestaurants() {
    this.isLoading=true
    this.resService.getRestaurants().subscribe((res) => {
      this.isLoading=false
      if (res['status']) {
        this.dd_mdl_restaurants.dataArr = res['data']
      }
    },error=>{
      this.isLoading=false
      alert(JSON.stringify(error))
    })
  }
  getUsers() {
    this.isLoading=true
    this.loginService.getUsers().subscribe((res) => {
      this.isLoading=false
      if (res['status']) {
        this.dd_mdl_users.dataArr = res['data']
      }
    },error=>{
      this.isLoading=false
      alert(JSON.stringify(error))
    })
  }

  eventHandler(event) {
  }
  assignResToUser() {
    const res_id = this.dd_mdl_restaurants['selectedValue']
    const user_id = this.dd_mdl_users['selectedValue']
    const role_id = this.dd_mdl_role['selectedValue']
    this.isLoading=true
    this.resService.assignuserToRestaurant(res_id, user_id, role_id).subscribe((res) => {
      this.isLoading=false
      if (res['status']) {
        alert(res['msg'])
      }else{
        if(res['msg']){
          alert(res['msg'])
        }else{
          alert(JSON.stringify(res))
        }
      }
    },error=>{
      this.isLoading=false
      alert(JSON.stringify(error))
    })
  }
}
