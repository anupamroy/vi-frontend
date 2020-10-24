import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccountsHeadComponent } from './list-accounts-head.component';

describe('ListAccountsHeadComponent', () => {
  let component: ListAccountsHeadComponent;
  let fixture: ComponentFixture<ListAccountsHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
