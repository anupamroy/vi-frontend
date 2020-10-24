import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeesHeadComponent } from './list-fees-head.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ListFeesHeadComponent', () => {
  let component: ListFeesHeadComponent;
  let fixture: ComponentFixture<ListFeesHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFeesHeadComponent ],
      imports:[HttpClientTestingModule],
      

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFeesHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
