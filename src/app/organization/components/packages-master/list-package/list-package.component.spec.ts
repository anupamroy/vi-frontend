import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPackageComponent } from './list-package.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import {FormsModule} from '@angular/forms';
describe('ListPackageComponent', () => {
  let component: ListPackageComponent;
  let fixture: ComponentFixture<ListPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [ ListPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
