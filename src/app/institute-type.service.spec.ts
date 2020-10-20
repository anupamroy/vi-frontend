import { TestBed } from '@angular/core/testing';

import { InstituteTypeService } from './institute-type.service';

describe('InstituteTypeService', () => {
  let service: InstituteTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
