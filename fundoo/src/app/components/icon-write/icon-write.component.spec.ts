import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconWriteComponent } from './icon-write.component';

describe('IconWriteComponent', () => {
  let component: IconWriteComponent;
  let fixture: ComponentFixture<IconWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
