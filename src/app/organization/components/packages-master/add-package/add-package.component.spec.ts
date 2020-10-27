import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackageComponent } from './add-package.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import {FormsModule} from '@angular/forms';

describe('AddPackageComponent', () => {
  let component: AddPackageComponent;
  let fixture: ComponentFixture<AddPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [ AddPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
