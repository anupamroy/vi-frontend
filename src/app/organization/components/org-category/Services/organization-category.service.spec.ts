import { TestBed } from '@angular/core/testing';

import { OrganizationCategoryService } from './organization-category.service';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OrganizationCategoryService', () => {
  let service: OrganizationCategoryService;
  let httpmock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[OrganizationCategoryService]
    });
    service = TestBed.inject(OrganizationCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

