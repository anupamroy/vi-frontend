import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountsHeadComponent } from './add-accounts-head.component';

describe('AddAccountsHeadComponent', () => {
  let component: AddAccountsHeadComponent;
  let fixture: ComponentFixture<AddAccountsHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountsHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountsHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
