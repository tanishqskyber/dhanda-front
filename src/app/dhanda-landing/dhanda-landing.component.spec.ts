import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhandaLandingComponent } from './dhanda-landing.component';

describe('DhandaLandingComponent', () => {
  let component: DhandaLandingComponent;
  let fixture: ComponentFixture<DhandaLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DhandaLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DhandaLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
