import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsWaitComponent } from './appointments-wait.component';

describe('AppointmentsWaitComponent', () => {
  let component: AppointmentsWaitComponent;
  let fixture: ComponentFixture<AppointmentsWaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsWaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
