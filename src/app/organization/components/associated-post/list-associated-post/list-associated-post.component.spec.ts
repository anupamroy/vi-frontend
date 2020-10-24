import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssociatedPostComponent } from './list-associated-post.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ListAssociatedPostComponent', () => {
  let component: ListAssociatedPostComponent;
  let fixture: ComponentFixture<ListAssociatedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ ListAssociatedPostComponent ],
      providers:[ListAssociatedPostComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssociatedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
