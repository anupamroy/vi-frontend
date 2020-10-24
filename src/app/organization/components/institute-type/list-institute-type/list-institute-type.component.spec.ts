import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInstituteTypeComponent } from './list-institute-type.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ListInstituteTypeComponent', () => {
  let component: ListInstituteTypeComponent;
  let fixture: ComponentFixture<ListInstituteTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ ListInstituteTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInstituteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
