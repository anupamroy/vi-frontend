import { TestBed } from '@angular/core/testing';

import { AccountsHeadService } from './accounts-head.service';

describe('AccountsHeadService', () => {
  let service: AccountsHeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsHeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
