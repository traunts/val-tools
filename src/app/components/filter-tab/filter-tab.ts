import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PlayerListComponent } from '../player-list/player-list.component';
import { PlayerListService } from '../../services/player-list/player-list.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter-tab',
  imports: [MatCardModule, MatListModule, MatIconModule, PlayerListComponent, MatButtonModule],
  templateUrl: './filter-tab.html',
  styleUrl: './filter-tab.scss',
})
export class FilterTab {
  playerService = inject(PlayerListService);

  disabledPlayers = computed(() =>
    this.playerService.playerList().filter((player) => !player.enabled)
  );

  enabledPlayers = computed(() =>
    this.playerService.playerList().filter((player) => player.enabled)
  );

  toggleAllPlayers(enabled: boolean) {
    this.playerService.setAllPlayersToState(enabled);
  }
}
