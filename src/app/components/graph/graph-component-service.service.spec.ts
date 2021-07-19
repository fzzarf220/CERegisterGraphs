import { TestBed } from '@angular/core/testing';

import { GraphComponentServiceService } from './graph-component-service.service';

describe('GraphComponentServiceService', () => {
  let service: GraphComponentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphComponentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
