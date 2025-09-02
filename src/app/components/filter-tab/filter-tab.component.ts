import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PlayerListComponent } from '../player-list/player-list.component';
import { PlayerListService } from '../../services/player-list/player-list.service';
import { MatButtonModule } from '@angular/material/button';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatOption,
} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { PlayerData } from '../../models/player-data.interface';

@Component({
  selector: 'app-filter-tab',
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    PlayerListComponent,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './filter-tab.component.html',
  styleUrl: './filter-tab.component.scss',
})
export class FilterTabComponent implements OnInit {
  nameFilter = new FormControl<string | PlayerData>('');

  filteredPlayerList = signal<PlayerData[]>([]);

  playerService = inject(PlayerListService);

  toggleAllPlayers(enabled: boolean) {
    this.playerService.setAllPlayersToState(enabled);
  }

  toggleSelectedPlayerFromAutocomplete($event: MatAutocompleteSelectedEvent) {
    console.log('Toggling player from autocomplete', $event);
    const selectedPlayer: MatOption<PlayerData> = $event.option;
    if (!selectedPlayer.value.id) {
      return;
    }
    this.playerService.togglePlayerById(selectedPlayer.value.id);
  }

  ngOnInit() {
    this.nameFilter.valueChanges
      .pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return this._filter(name || '');
        }),
        map((players) => {
          this.filteredPlayerList.set(players);
        })
      )
      .subscribe();
  }

  displayPlayer(player?: PlayerData | string): string {
    return typeof player === 'string' ? player : player?.name ?? '';
  }

  private _filter(value: string): PlayerData[] {
    const filterValue = value.toLowerCase();

    const playersByName = this.playerService
      .allPlayers()
      .filter((player) => player.name.toLowerCase().includes(filterValue));

    return playersByName;
  }
}
