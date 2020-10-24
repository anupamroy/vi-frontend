import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountsHeadComponent } from './edit-accounts-head.component';

describe('EditAccountsHeadComponent', () => {
  let component: EditAccountsHeadComponent;
  let fixture: ComponentFixture<EditAccountsHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccountsHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountsHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
