import { TestBed } from '@angular/core/testing';

import { AccountsHeadService } from './accounts-head.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AccountsHeadService', () => {
  let service: AccountsHeadService;
  let httpmock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AccountsHeadService]
    });
    service = TestBed.inject(AccountsHeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
