import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPinComponent } from './icon-pin.component';

describe('IconPinComponent', () => {
  let component: IconPinComponent;
  let fixture: ComponentFixture<IconPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
