import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriesPopupComponent } from './sub-categories-popup.component';

describe('SubCategoriesPopupComponent', () => {
  let component: SubCategoriesPopupComponent;
  let fixture: ComponentFixture<SubCategoriesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoriesPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoriesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
