import { TestBed } from '@angular/core/testing';

import { ApartadoRopaService } from './apartado-ropa.service';

describe('ApartadoRopaService', () => {
  let service: ApartadoRopaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartadoRopaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
