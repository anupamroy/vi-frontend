import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstituteTypeComponent } from './edit-institute-type.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';

describe('EditInstituteTypeComponent', () => {
  let component: EditInstituteTypeComponent;
  let fixture: ComponentFixture<EditInstituteTypeComponent>;
  let httpmock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,FormsModule],
      declarations: [ EditInstituteTypeComponent ],
      providers:[EditInstituteTypeComponent]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstituteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.newInstituteType='text';
    expect(component).toBeTruthy();
  });
});
