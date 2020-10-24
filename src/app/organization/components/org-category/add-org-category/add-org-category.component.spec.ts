import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgCategoryComponent } from './add-org-category.component';
import { OrganizationCategoryService } from '../Services/organization-category.service'
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';

describe('AddOrgCategoryComponent', () => {
  let component: AddOrgCategoryComponent;
  let fixture: ComponentFixture<AddOrgCategoryComponent>;
  let httpmock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,FormsModule],
      declarations: [ AddOrgCategoryComponent ],
      providers:[AddOrgCategoryComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrgCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
