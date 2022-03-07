import { TestBed } from '@angular/core/testing';

import { TabManagementService } from './tab-management.service';

describe('TabManagementService', () => {
  let service: TabManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
