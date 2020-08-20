import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsDialogProfileComponent } from './nurses-dialog-profile.component';

describe('DoctorsDialogProfileComponent', () => {
  let component: DoctorsDialogProfileComponent;
  let fixture: ComponentFixture<DoctorsDialogProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsDialogProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsDialogProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
