import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPackageComponent } from './edit-package.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import {FormsModule} from '@angular/forms';

describe('EditPackageComponent', () => {
  let component: EditPackageComponent;
  let fixture: ComponentFixture<EditPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [ EditPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
