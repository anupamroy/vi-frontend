import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeesTypeComponent } from './edit-fees-type.component';

describe('EditFeesTypeComponent', () => {
  let component: EditFeesTypeComponent;
  let fixture: ComponentFixture<EditFeesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFeesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
