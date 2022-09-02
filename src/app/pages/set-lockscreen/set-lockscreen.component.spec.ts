import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLockscreenComponent } from './set-lockscreen.component';

describe('SetLockscreenComponent', () => {
  let component: SetLockscreenComponent;
  let fixture: ComponentFixture<SetLockscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetLockscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetLockscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
