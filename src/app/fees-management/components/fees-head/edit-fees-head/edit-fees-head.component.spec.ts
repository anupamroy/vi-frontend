import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditFeesHeadComponent } from './edit-fees-head.component';
import { from } from 'rxjs';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EditFeesHeadComponent', () => {
  let component: EditFeesHeadComponent;
  let fixture: ComponentFixture<EditFeesHeadComponent>;
  let httpmock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,RouterTestingModule,HttpClientTestingModule],
      declarations: [ EditFeesHeadComponent ],
      providers: [FormBuilder,EditFeesHeadComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeesHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
