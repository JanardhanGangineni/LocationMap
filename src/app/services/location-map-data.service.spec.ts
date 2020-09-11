import { TestBed } from '@angular/core/testing';

import { LocationMapDataService } from './location-map-data.service';

describe('LocationMapDataService', () => {
  let service: LocationMapDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationMapDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
