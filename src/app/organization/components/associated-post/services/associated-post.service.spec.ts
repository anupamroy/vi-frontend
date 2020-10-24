import { TestBed } from '@angular/core/testing';

import { AssociatedPostService } from './associated-post.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AssociatedPostService', () => {
  let service: AssociatedPostService;
  let httpmock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AssociatedPostService]

    });
    service = TestBed.inject(AssociatedPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
