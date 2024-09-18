import { Injectable } from "@angular/core";
import { DBManagerService } from "./db-manager.service";

@Injectable({
  providedIn: 'root',
})
export class Constants {

  static API_URL = 'http://192.168.0.127:3099/api/'
  static USER_DATA_KEY = 'login_user_data'
  static RES_USER_SELECTED_KEY = 'restaurant_user_selected_data'

  static isRestaurantUsers() {
    const role_id = DBManagerService.getData(Constants.USER_DATA_KEY)['role_id']
    return role_id == 2 || role_id == 4
  }
}
