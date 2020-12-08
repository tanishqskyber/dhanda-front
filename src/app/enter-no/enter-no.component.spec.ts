import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterNoComponent } from './enter-no.component';

describe('EnterNoComponent', () => {
  let component: EnterNoComponent;
  let fixture: ComponentFixture<EnterNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
