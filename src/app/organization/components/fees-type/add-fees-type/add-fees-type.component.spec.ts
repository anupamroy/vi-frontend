import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeesTypeComponent } from './add-fees-type.component';

describe('AddFeesTypeComponent', () => {
  let component: AddFeesTypeComponent;
  let fixture: ComponentFixture<AddFeesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
