import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailOrganizationComponent } from './list-detail-organization.component';

describe('ListDetailOrganizationComponent', () => {
  let component: ListDetailOrganizationComponent;
  let fixture: ComponentFixture<ListDetailOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDetailOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
