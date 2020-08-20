import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsCancelComponent } from './appointments-cancel.component';

describe('AppointmentsCancelComponent', () => {
  let component: AppointmentsCancelComponent;
  let fixture: ComponentFixture<AppointmentsCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
