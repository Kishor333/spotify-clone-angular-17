import { TestBed } from '@angular/core/testing';

import { SharedFacadeService } from './shared-facade.service';

describe('SharedFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } }));

  it('should be created', () => {
    const service: SharedFacadeService = TestBed.get(SharedFacadeService);
    expect(service).toBeTruthy();
  });
});
