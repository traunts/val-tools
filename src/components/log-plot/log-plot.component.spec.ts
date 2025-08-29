import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogPlotComponent } from './log-plot.component';

describe('LogPlotComponent', () => {
  let component: LogPlotComponent;
  let fixture: ComponentFixture<LogPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogPlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
