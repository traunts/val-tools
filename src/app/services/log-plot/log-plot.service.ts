import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogPlotService {
  dateRange = signal<{ lower: Date; upper: Date } | null>(null);
  radius = signal<number | null>(null);

  constructor() {}
}
