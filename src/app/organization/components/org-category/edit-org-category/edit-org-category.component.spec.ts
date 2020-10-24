import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrgCategoryComponent } from './edit-org-category.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import { InstituteTypeService } from '../../institute-type/Services/institute-type.service';

describe('EditOrgCategoryComponent', () => {
  let component: EditOrgCategoryComponent;
  let fixture: ComponentFixture<EditOrgCategoryComponent>;
  let httpmock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,FormsModule],
      declarations: [ EditOrgCategoryComponent ],
      providers:[InstituteTypeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrgCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.OrgCategory='text';
    expect(component).toBeTruthy();
  });
});
