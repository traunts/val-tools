import { Component, computed, inject } from '@angular/core';
import { ListEntryComponent } from './list-entry/list-entry.component';
import { PlayerListService } from '../../services/player-list/player-list.service';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-player-list',
  imports: [
    ListEntryComponent,
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatChipsModule,
    MatListModule,
  ],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent {
  private playerService = inject(PlayerListService);

  public enabledPlayers = computed(() =>
    this.playerService
      .playerList()
      .filter((player) => player.enabled)
      .sort((a, b) => a.name.localeCompare(b.name))
  );
  public disabledPlayers = computed(() =>
    this.playerService
      .playerList()
      .filter((player) => !player.enabled)
      .sort((a, b) => a.name.localeCompare(b.name))
  );
  constructor() {}
}
