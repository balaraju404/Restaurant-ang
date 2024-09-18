import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCategoriesComponent } from './restaurant-categories.component';

describe('RestaurantCategoriesComponent', () => {
  let component: RestaurantCategoriesComponent;
  let fixture: ComponentFixture<RestaurantCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
