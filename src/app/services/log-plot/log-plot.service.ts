import { Injectable, signal } from '@angular/core';
import { PositionTrace } from '../../models/position-trace.interface';

@Injectable({
  providedIn: 'root',
})
export class LogPlotService {
  dataLoaded = signal(false);

  dateRange = signal<{ lower: string; upper: string } | null>(null);
  radius = signal<number | null>(null);

  positionTraces = signal<Record<string, PositionTrace[]>>({});

  appendTracesToPlayer(playerName: string, trace: PositionTrace): void {
    console.debug('Appending trace for player', playerName, trace);
    const currentTraces = this.positionTraces();

    if (!currentTraces[playerName]) {
      currentTraces[playerName] = [];
    }
    currentTraces[playerName].push(trace);

    this.positionTraces.set({ ...currentTraces });
  }
}
