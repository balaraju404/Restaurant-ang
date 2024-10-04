import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrl: './create-restaurant.component.scss'
})
export class CreateRestaurantComponent {
  isLoading:boolean=false;
  files: File[] = [];
  error_msg: string;
  tbl_headers = [
    { 'headerName': 'Restaurant Name', 'headerKey': 'restaurant_name' },
    { 'headerName': 'Restaurant Logo', 'headerKey': 'res_logo' },
    { 'headerName': 'Created Date', 'headerKey': 'created_date' },
    { 'headerName': 'Modified Date', 'headerKey': 'modified_date' },
    { 'headerName': 'Status', 'headerKey': 'status' }
  ]
  restaurant_list: any[];
  constructor(private resService: RestaurantService) { }
  ngOnInit() {
    this.getRestaurants()
  }
  onCreateRestaurant(form: NgForm) {
    const formData = form.form.value
    this.isLoading = true;
    this.resService.restaurantCreate(formData.restaurantname, this.files,formData.description).subscribe((res: any) => {
      this.isLoading=false
      if (res['status']) {
        alert(res['msg'])
        this.getRestaurants()
      } else {
        alert(JSON.stringify(res))
      }
    },error=>{
      this.isLoading=false
      alert(error.error.msg || JSON.stringify(error))
    })
  }
  getRestaurants() {
    this.isLoading = true;
    this.resService.getRestaurants().subscribe((res: any) => {
      this.isLoading = false;
      if (res['status']) {
        this.restaurant_list = res['data'];
      } else {
        this.restaurant_list = [];
      }
    },error=>{
      this.isLoading=false
      alert(JSON.stringify(error))
    })
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.files = Array.from(event.target.files);
    }
  }
}
