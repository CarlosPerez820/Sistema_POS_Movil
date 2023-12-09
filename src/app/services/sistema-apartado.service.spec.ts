import { TestBed } from '@angular/core/testing';

import { SistemaApartadoService } from './sistema-apartado.service';

describe('SistemaApartadoService', () => {
  let service: SistemaApartadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SistemaApartadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
