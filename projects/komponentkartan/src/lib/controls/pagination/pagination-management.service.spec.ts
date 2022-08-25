import { TestBed } from '@angular/core/testing';

import { PaginationManagementService } from './pagination-management.service';

describe('PaginationManagementService', () => {
  let service: PaginationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
