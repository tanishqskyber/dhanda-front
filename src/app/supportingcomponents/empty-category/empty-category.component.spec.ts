import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCategoryComponent } from './empty-category.component';

describe('EmptyCategoryComponent', () => {
  let component: EmptyCategoryComponent;
  let fixture: ComponentFixture<EmptyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
