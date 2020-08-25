import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCollaboratorComponent } from './icon-collaborator.component';

describe('IconCollaboratorComponent', () => {
  let component: IconCollaboratorComponent;
  let fixture: ComponentFixture<IconCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
