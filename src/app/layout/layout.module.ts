import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RestaurantSetupComponent } from './restaurant-setup/restaurant-setup.component';
import { UserSetupComponent } from './user-setup/user-setup.component';
import { AssignRestaurantUserComponent } from './assign-restaurant-user/assign-restaurant-user.component';
import { CreateRestaurantComponent } from './restaurant-setup/create-restaurant/create-restaurant.component';
import { CustomDropdownModule } from "../reusable-components/custom-dropdown/custom-dropdown.module";
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { RestaurantsListComponent } from './user/restaurants-list/restaurants-list.component';
import { ShortenStringPipe } from "../reusable-components/pipes/shorten-string.pipe";
import { RestaurantComponent } from './user/restaurant/restaurant.component';
import { RestaurantCategoriesComponent } from './restaurant-categories/restaurant-categories.component';
import { CartComponent } from './user/cart/cart.component';
import { TransactionsComponent } from './transactions/transactions.component';
@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, SideMenuComponent, RestaurantSetupComponent, UserSetupComponent, AssignRestaurantUserComponent, CreateRestaurantComponent, CategoriesComponent, ProductsComponent, RestaurantsListComponent, ShortenStringPipe, RestaurantComponent, RestaurantCategoriesComponent, CartComponent, TransactionsComponent],
  imports: [RouterModule, FormsModule, CustomDropdownModule]
})
export class LayoutModule { }
