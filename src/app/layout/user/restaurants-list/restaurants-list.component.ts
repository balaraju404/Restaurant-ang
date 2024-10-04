import { Component } from '@angular/core';
import { RestaurantService } from '../../restaurant-setup/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrl: './restaurants-list.component.scss'
})
export class RestaurantsListComponent {
  isLoading:boolean=false;
  restaurants_list: any = []
  duplicate_list: any[] = []
  paginationObj: any = { 'page_num': 1, 'page_limit': 10 }
  constructor(private resService: RestaurantService, private router: Router) { }

  ngOnInit() {
    this.getAllRestaurants();
  }
  getAllRestaurants() {
    this.isLoading = true;
    this.resService.getRestaurants().subscribe((res: any) => {
      this.isLoading = false;
      if (res['status']) {
        this.restaurants_list = res['data'];
        this.duplicate_list = JSON.parse(JSON.stringify(res['data']))
      }
    },error=>{
      this.isLoading = false;
      alert(JSON.stringify(error))
    })
  }
  onSearch(event: string) {
    const searchTerm = event.toLowerCase().trim();

    if (searchTerm) {
      this.restaurants_list = this.duplicate_list.filter((item: any) =>
        item['restaurant_name'].toLowerCase().includes(searchTerm)
      );
    } else {
      this.restaurants_list = [...this.duplicate_list];
    }
  }
  navigateToRestaurant(res_id: any) {
    this.router.navigateByUrl(`/admin-dashboard/${res_id}`);
  }
}
