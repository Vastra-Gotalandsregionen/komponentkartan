import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';

describe('ListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListService = TestBed.inject(ListService);
    expect(service).toBeTruthy();
  });
});
