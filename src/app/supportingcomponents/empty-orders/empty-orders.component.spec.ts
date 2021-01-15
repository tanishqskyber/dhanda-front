import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyOrdersComponent } from './empty-orders.component';

describe('EmptyOrdersComponent', () => {
  let component: EmptyOrdersComponent;
  let fixture: ComponentFixture<EmptyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
