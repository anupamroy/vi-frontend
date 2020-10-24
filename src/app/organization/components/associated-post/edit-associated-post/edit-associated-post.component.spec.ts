import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssociatedPostComponent } from './edit-associated-post.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';

describe('EditAssociatedPostComponent', () => {
  let component: EditAssociatedPostComponent;
  let fixture: ComponentFixture<EditAssociatedPostComponent>;
  let httpmock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
      declarations: [ EditAssociatedPostComponent ],
      providers:[EditAssociatedPostComponent]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssociatedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.associated_post='text';
    expect(component).toBeTruthy();
  });
});
