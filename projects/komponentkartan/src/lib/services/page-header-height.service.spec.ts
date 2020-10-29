import { TestBed } from '@angular/core/testing';

import { PageHeaderHeightService } from './page-header-height.service';

describe('PageHeaderHeightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageHeaderHeightService = TestBed.inject(PageHeaderHeightService);
    expect(service).toBeTruthy();
  });
});
