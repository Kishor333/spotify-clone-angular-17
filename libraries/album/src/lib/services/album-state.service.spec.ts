import { TestBed } from '@angular/core/testing';

import { AlbumStateService } from './album-state.service';

describe('AlbumStateService', () => {
  let service: AlbumStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
