import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogPlotService {
  dataLoaded = signal(false);

  dateRange = signal<{ lower: string; upper: string } | null>(null);
  radius = signal<number | null>(null);
}
