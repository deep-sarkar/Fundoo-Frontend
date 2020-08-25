import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconReminderComponent } from './icon-reminder.component';

describe('IconReminderComponent', () => {
  let component: IconReminderComponent;
  let fixture: ComponentFixture<IconReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
