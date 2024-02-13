import { TestBed } from '@angular/core/testing';

import { SharedApiService } from './shared-api.service';

describe('SharedApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } }));

  it('should be created', () => {
    const service: SharedApiService = TestBed.get(SharedApiService);
    expect(service).toBeTruthy();
  });
});
