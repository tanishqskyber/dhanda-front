import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptySubCategoryComponent } from './empty-sub-category.component';

describe('EmptySubCategoryComponent', () => {
  let component: EmptySubCategoryComponent;
  let fixture: ComponentFixture<EmptySubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptySubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptySubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
