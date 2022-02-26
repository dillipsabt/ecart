import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurentdashComponent } from './restaurentdash.component';

describe('RestaurentdashComponent', () => {
  let component: RestaurentdashComponent;
  let fixture: ComponentFixture<RestaurentdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurentdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurentdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
