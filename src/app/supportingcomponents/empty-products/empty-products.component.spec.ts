import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyProductsComponent } from './empty-products.component';

describe('EmptyProductsComponent', () => {
  let component: EmptyProductsComponent;
  let fixture: ComponentFixture<EmptyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
