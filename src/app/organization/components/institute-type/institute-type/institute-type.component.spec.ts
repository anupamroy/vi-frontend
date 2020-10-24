import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteTypeComponent } from './institute-type.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";

describe('InstituteTypeComponent', () => {
  let component: InstituteTypeComponent;
  let fixture: ComponentFixture<InstituteTypeComponent>;
  let httpmock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
      declarations: [ InstituteTypeComponent ],
      providers:[InstituteTypeComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
