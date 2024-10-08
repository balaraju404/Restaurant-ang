import { Component } from '@angular/core';
import { UIDropdown } from '../../reusable-components/custom-dropdown/custom-dropdown.component';
import { RestaurantService } from '../restaurant-setup/restaurant.service';
import { DBManagerService } from '../../utils/db-manager.service';
import { Constants } from '../../utils/constants.service';

@Component({
  selector: 'app-restaurant-categories',
  templateUrl: './restaurant-categories.component.html',
  styleUrl: './restaurant-categories.component.scss'
})
export class RestaurantCategoriesComponent {
  isLoading: boolean = false;
  dd_mdl_categories!: UIDropdown;

  constructor(private resService: RestaurantService) { }

  ngOnInit() {
    this.setUpFields()
    this.getCategories()
  }
  setUpFields() {
    this.dd_mdl_categories = new UIDropdown(1, '', false, []);
    this.dd_mdl_categories['selectedValue'] = -1;
    this.dd_mdl_categories.valueKey = 'cat_id';
    this.dd_mdl_categories.displayKey = 'cat_name';

  }
  getCategories() {
    this.isLoading = true
    this.resService.getCategories().subscribe((res) => {
      this.isLoading = false
      if (res['status']) {
        this.dd_mdl_categories.dataArr = res['data']
      }
    }, error => {
      this.isLoading = false
      alert(JSON.stringify(error))
    })
  }

  eventHandler(event) {
  }
  assignCategotyToRes() {
    const selectedData = DBManagerService.getData(Constants.RES_USER_SELECTED_KEY)
    const res_id = selectedData['res_id']
    const cat_id = this.dd_mdl_categories['selectedValue']
    this.isLoading=true
    this.resService.assignCategotyToRes(res_id, cat_id).subscribe((res) => {
      this.isLoading=false
      if (res['status']) {
        alert(res['msg'])
      } else {
        if (res['msg']) {
          alert(res['msg'])
        } else {
          alert(JSON.stringify(res))
        }
      }
    },error=>{
      this.isLoading=false
      alert(JSON.stringify(error))
    })
  }
}
