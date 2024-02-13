import { TestBed } from '@angular/core/testing';

import { SharedStateService } from './shared-state.service';

describe('SharedStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } }));

  it('should be created', () => {
    const service: SharedStateService = TestBed.get(SharedStateService);
    expect(service).toBeTruthy();
  });
});
