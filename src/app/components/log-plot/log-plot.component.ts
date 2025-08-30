import { Component, computed, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { LogPlotService } from '../../services/log-plot/log-plot.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-log-plot',
  imports: [MatCard, MatCardContent, MatCardHeader, DatePipe],
  templateUrl: './log-plot.component.html',
  styleUrl: './log-plot.component.scss',
})
export class LogPlotComponent {
  dataService = inject(LogPlotService);

  radius = this.dataService.radius;
  dateRange = computed(() => this.dataService.dateRange());
}
