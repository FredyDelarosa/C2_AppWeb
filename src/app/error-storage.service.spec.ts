import { TestBed } from '@angular/core/testing';

import { ErrorStorageService } from './error-storage.service';

describe('ErrorStorageService', () => {
  let service: ErrorStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
