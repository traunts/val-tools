import { inject, Injectable } from '@angular/core';
import { PlayerListService } from '../player-list/player-list.service';
import { LogPlotService } from '../log-plot/log-plot.service';
import { PlayerData } from '../../models/player-data.interface';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private playerService = inject(PlayerListService);
  private dataService = inject(LogPlotService);

  constructor() {}

  async parseLogFile(file: File): Promise<void> {
    // Read file content
    const fileContent = await file.text();

    console.log('File content:', fileContent);

    // Extract Headers: Date Range and Radius
    const headerRegex = /Date Range:\s*([0-9-]+)\s+to\s+([0-9-]+)\s*\nRadius:\s*([\d.]+)/;
    const headerMatch = fileContent.match(headerRegex);
    if (headerMatch) {
      console.log('Date Start:', headerMatch[1]);
      console.log('Date End:', headerMatch[2]);
      console.log('Radius:', headerMatch[3]);
    }
    // Extract Player Names and Hashes, populate player list in service

    const playerRegex = /\(([^,]+),\s*(\d+)\)/g;

    const players: PlayerData[] = [];
    let playerMatch;
    while ((playerMatch = playerRegex.exec(fileContent)) !== null) {
      console.log('Player Name:', playerMatch[1].trim());
      console.log('Steam ID:', playerMatch[2]);
      players.push({ name: playerMatch[1].trim(), id: playerMatch[2], enabled: false });
    }

    this.playerService.playerList.set(players);

    // Extract all logs, send to log processing service

    // const logRegex = /(\w+):\s*\[([-\d.,\s]+)\]\s*\(([\d-]+\s[\d:.]+)\)/g;
    // let logMatch;
    // while ((logMatch = logRegex.exec(fileContent)) !== null) {
    //   console.log('Player:', logMatch[1]);
    //   console.log('Coordinates:', logMatch[2].split(/\s*,\s*/).map(Number));
    //   console.log('Timestamp:', logMatch[3]);
    // }
  }
}
