import { TestBed } from '@angular/core/testing';

import { FeesService } from './fees-type.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FeesTypeService', () => {
  let service: FeesService;
  let httpmock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[FeesService]

    });
    service = TestBed.inject(FeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
