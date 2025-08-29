import { TestBed } from '@angular/core/testing';

import { LogPlotService } from './log-plot.service';

describe('LogPlotService', () => {
  let service: LogPlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogPlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
