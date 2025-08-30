import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { PlayerData } from '../../models/player-data.interface';
import { PlayerListService } from '../../services/player-list/player-list.service';

@Component({
  selector: 'app-player-list',
  imports: [CommonModule, MatChipsModule, MatListModule, MatButtonModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent {
  playerList = input.required<PlayerData[], PlayerData[]>({
    transform: this.sortPlayerList,
  });

  playerService = inject(PlayerListService);

  togglePlayer(player: PlayerData) {
    console.log(`Toggling enabled for player ${player.name}`);
    this.playerService.togglePlayerEnabled(player.id);
  }

  private sortPlayerList(list: PlayerData[]): PlayerData[] {
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }
}
