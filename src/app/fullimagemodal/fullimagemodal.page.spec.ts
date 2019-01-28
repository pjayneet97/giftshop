import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullimagemodalPage } from './fullimagemodal.page';

describe('FullimagemodalPage', () => {
  let component: FullimagemodalPage;
  let fixture: ComponentFixture<FullimagemodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullimagemodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullimagemodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
