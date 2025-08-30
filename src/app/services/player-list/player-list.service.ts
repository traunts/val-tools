import { Injectable, signal, WritableSignal } from '@angular/core';
import { PlayerData } from '../../models/player-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerListService {
  public playerList: WritableSignal<PlayerData[]>;

  constructor() {
    this.playerList = signal<PlayerData[]>([]);
  }

  togglePlayerEnabled(id: string): void {
    const players = this.playerList();
    const player = players.find((p) => p.id === id);
    if (player) {
      player.enabled = !player.enabled;
      this.playerList.set([...players]);
    }
  }
}
