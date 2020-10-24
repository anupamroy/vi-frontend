import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccountsHeadComponent } from './list-accounts-head.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ListAccountsHeadComponent', () => {
  let component: ListAccountsHeadComponent;
  let fixture: ComponentFixture<ListAccountsHeadComponent>;
  let httpmock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ ListAccountsHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccountsHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
