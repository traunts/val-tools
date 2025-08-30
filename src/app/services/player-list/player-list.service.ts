import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { PlayerData } from '../../models/player-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerListService {
  private playerList: WritableSignal<PlayerData[]>;

  // Public Accessors
  allPlayers = computed(() => this.playerList());
  disabledPlayers = computed(() => this.playerList().filter((player) => !player.enabled));
  enabledPlayers = computed(() => this.playerList().filter((player) => player.enabled));

  constructor() {
    this.playerList = signal<PlayerData[]>([]);
  }

  populatePlayers(players: PlayerData[]) {
    this.playerList.set(players);
  }

  togglePlayerById(id: string): void {
    const players = this.playerList();
    const player = players.find((p) => p.id === id);
    if (player) {
      player.enabled = !player.enabled;
      this.playerList.set([...players]);
    }
  }

  togglePlayerByName(name: string): void {
    const players = this.playerList();
    const player = players.find((p) => p.name === name);
    if (player) {
      player.enabled = !player.enabled;
      this.playerList.set([...players]);
    }
  }

  setAllPlayersToState(enabledState: boolean): void {
    const players = this.playerList().map((p) => {
      p.enabled = enabledState;
      return p;
    });

    this.playerList.set(players);
  }
}
