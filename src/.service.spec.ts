import { TestBed } from '@angular/core/testing';

import { Service } from './.service';

describe('Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Service = TestBed.inject(Service);
    expect(service).toBeTruthy();
  });
});
