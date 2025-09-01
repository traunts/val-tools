import { inject, Injectable } from '@angular/core';
import { PlayerListService } from '../player-list/player-list.service';
import { LogPlotService } from '../log-plot/log-plot.service';
import { PlayerData } from '../../models/player-data.interface';
import { PositionTrace } from '../../models/position-trace.interface';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private playerService = inject(PlayerListService);
  private dataService = inject(LogPlotService);

  fileContent: string | null = null;

  async parseLogFile(file: File): Promise<void> {
    this.dataService.dataLoaded.set(false);

    // Read file content
    this.fileContent = await file.text();

    console.log('File content:', this.fileContent);

    // Extract Headers: Date Range and Radius
    const headerRegex = /Date Range:\s*([0-9-]+)\s+to\s+([0-9-]+)\s*\nRadius:\s*([\d.]+)/;
    const headerMatch = this.fileContent.match(headerRegex);
    if (headerMatch) {
      const dateStart = headerMatch[1];
      const dateEnd = headerMatch[2];
      const radius = parseFloat(headerMatch[3]);

      console.log('Date Start:', dateStart);
      console.log('Date End:', dateEnd);
      console.log('Radius:', radius);

      this.dataService.dateRange.set({
        lower: dateStart,
        upper: dateEnd,
      });
      this.dataService.radius.set(radius);
    }
    // Extract Player Names and Hashes, populate player list in service

    const playerRegex = /\(([^,]+),\s*(\d+)\)/g;

    const players: PlayerData[] = [];
    let playerMatch;
    while ((playerMatch = playerRegex.exec(this.fileContent)) !== null) {
      const name = playerMatch[1].trim();
      const id = playerMatch[2];

      console.log('Player Name:', name);
      console.log('Steam ID:', id);

      players.push({ name, id, enabled: false });
    }

    this.playerService.populatePlayers(players);

    // Extract all logs, send to log processing service

    const logRegex = /(.*):\s*\[([-\d.,\s]+)\]\s*\(([\d-]+\s[\d:.]+)\)/g;
    let traceMatch;
    while ((traceMatch = logRegex.exec(this.fileContent)) !== null) {
      const playerName = traceMatch[1];
      const [x, y, z] = traceMatch[2].split(/\s*,\s*/).map(Number);
      const timestamp = traceMatch[3];

      const positionTrace: PositionTrace = {
        x,
        y,
        z,
        timestamp,
      };

      this.dataService.appendTracesToPlayer(playerName, positionTrace);
    }

    this.dataService.dataLoaded.set(true);

    console.log('Log file parsing completed.');
    console.log('Players:', this.playerService.allPlayers());
    console.log('Position Traces:', this.dataService.positionTraces());
  }
}
