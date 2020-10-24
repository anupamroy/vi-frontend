import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrgCategoryComponent } from './view-org-category.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ViewOrgCategoryComponent', () => {
  let component: ViewOrgCategoryComponent;
  let fixture: ComponentFixture<ViewOrgCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ ViewOrgCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrgCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
