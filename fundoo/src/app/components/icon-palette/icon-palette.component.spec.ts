import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPaletteComponent } from './icon-palette.component';

describe('IconPaletteComponent', () => {
  let component: IconPaletteComponent;
  let fixture: ComponentFixture<IconPaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconPaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
