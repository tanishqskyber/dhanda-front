import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedProductComponent } from './searched-product.component';

describe('SearchedProductComponent', () => {
  let component: SearchedProductComponent;
  let fixture: ComponentFixture<SearchedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
