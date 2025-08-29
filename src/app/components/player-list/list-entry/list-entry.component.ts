import { Component, inject, input } from '@angular/core';
import { PlayerData } from '../../../models/player-data.interface';
import { PlayerListService } from '../../../services/player-list/player-list.service';

@Component({
  selector: 'app-list-entry',
  imports: [],
  templateUrl: './list-entry.component.html',
  styleUrl: './list-entry.component.scss',
})
export class ListEntryComponent {
  player = input.required<PlayerData>();

  playerService = inject(PlayerListService);

  toggleEnabled() {
    console.log(`Toggling enabled for player ${this.player().name}`);
    this.playerService.togglePlayerEnabled(this.player().id);
  }
}
