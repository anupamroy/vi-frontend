import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeesTypeComponent } from './list-fees-type.component';

describe('ListFeesTypeComponent', () => {
  let component: ListFeesTypeComponent;
  let fixture: ComponentFixture<ListFeesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
