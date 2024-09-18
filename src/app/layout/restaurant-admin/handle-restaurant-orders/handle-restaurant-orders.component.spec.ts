import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleRestaurantOrdersComponent } from './handle-restaurant-orders.component';

describe('HandleRestaurantOrdersComponent', () => {
  let component: HandleRestaurantOrdersComponent;
  let fixture: ComponentFixture<HandleRestaurantOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandleRestaurantOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleRestaurantOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
