import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeesTypeComponent } from './list-fees-type.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ListFeesTypeComponent', () => {
  let component: ListFeesTypeComponent;
  let fixture: ComponentFixture<ListFeesTypeComponent>;
  let httpmock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ ListFeesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFeesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
