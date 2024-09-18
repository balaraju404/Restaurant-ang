import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LayoutComponent } from "./layout/layout.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { UserSetupComponent } from "./layout/user-setup/user-setup.component";
import { RestaurantSetupComponent } from "./layout/restaurant-setup/restaurant-setup.component";
import { AssignRestaurantUserComponent } from "./layout/assign-restaurant-user/assign-restaurant-user.component";
import { CreateRestaurantComponent } from "./layout/restaurant-setup/create-restaurant/create-restaurant.component";
import { CategoriesComponent } from "./layout/categories/categories.component";
import { ProductsComponent } from "./layout/products/products.component";
import { RestaurantsListComponent } from "./layout/user/restaurants-list/restaurants-list.component";
import { RestaurantComponent } from "./layout/user/restaurant/restaurant.component";
import { RestaurantCategoriesComponent } from "./layout/restaurant-categories/restaurant-categories.component";
import { CartComponent } from "./layout/user/cart/cart.component";
import { HandleRestaurantOrdersComponent } from "./layout/restaurant-admin/handle-restaurant-orders/handle-restaurant-orders.component";
import { TransactionsComponent } from "./layout/transactions/transactions.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  {
    path: 'layout', component: LayoutComponent, children: [
      { path: 'user-setup', component: UserSetupComponent },
      {
        path: 'restaurant-setup', component: RestaurantSetupComponent, children: [
          { path: 'create-restaurant', component: CreateRestaurantComponent }
        ]
      },
      { path: 'assign-restaurant-user', component: AssignRestaurantUserComponent },
      { path: 'create-categories', component: CategoriesComponent },
      { path: 'assign-categories-restaurant', component: RestaurantCategoriesComponent },
      { path: 'create-products', component: ProductsComponent },
      { path: 'restaurants', component: RestaurantsListComponent },
      { path: 'restaurant/:res_id', component: RestaurantComponent },
      { path: 'cart', component: CartComponent },
      { path: 'res-orders', component: HandleRestaurantOrdersComponent },
      { path: 'transactions', component: TransactionsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
