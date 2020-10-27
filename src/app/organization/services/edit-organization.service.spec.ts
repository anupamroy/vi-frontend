import { TestBed } from '@angular/core/testing';

import { EditOrganizationService } from './edit-organization.service';

describe('EditOrganizationService', () => {
  let service: EditOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
