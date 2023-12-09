import { TestBed } from '@angular/core/testing';

import { RestServiceServiceService } from './rest-service-service.service';

describe('RestServiceServiceService', () => {
  let service: RestServiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestServiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
