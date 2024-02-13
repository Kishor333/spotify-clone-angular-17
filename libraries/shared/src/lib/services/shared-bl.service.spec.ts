import { TestBed } from '@angular/core/testing';

import { SharedBlService } from './shared-bl.service';

describe('SharedBlService', () => {
  beforeEach(() => TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } }));

  it('should be created', () => {
    const service: SharedBlService = TestBed.get(SharedBlService);
    expect(service).toBeTruthy();
  });
});
