import { TestBed } from '@angular/core/testing';

import { AddOrganizationService } from './add-organization.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AddOrganizationService', () => {
  let service: AddOrganizationService;
  let httpmock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AddOrganizationService]
    });
    service = TestBed.inject(AddOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
