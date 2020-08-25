import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconInsertPhotoComponent } from './icon-insert-photo.component';

describe('IconInsertPhotoComponent', () => {
  let component: IconInsertPhotoComponent;
  let fixture: ComponentFixture<IconInsertPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconInsertPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconInsertPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
