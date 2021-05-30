import { TestBed } from '@angular/core/testing';

import { PlannerConfigService } from './planner-config.service';

describe('PlannerConfigService', () => {
  let service: PlannerConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlannerConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
