import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssociatedPostComponent } from './add-associated-post.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';

describe('AddAssociatedPostComponent', () => {
  let component: AddAssociatedPostComponent;
  let fixture: ComponentFixture<AddAssociatedPostComponent>;
  let httpmock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,FormsModule],
      declarations: [ AddAssociatedPostComponent ],
      providers:[AddAssociatedPostComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssociatedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
