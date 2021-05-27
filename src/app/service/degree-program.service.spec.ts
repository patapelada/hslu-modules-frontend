import { TestBed } from '@angular/core/testing';

import { DegreeProgramService } from './degree-program.service';

describe('DegreeProgramService', () => {
  let service: DegreeProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DegreeProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
