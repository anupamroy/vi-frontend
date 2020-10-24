import { TestBed } from '@angular/core/testing';

import { InstituteTypeService } from './institute-type.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('InstituteTypeService', () => {
  let service: InstituteTypeService;
  let httpmock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[InstituteTypeService]
    });
    service = TestBed.inject(InstituteTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
