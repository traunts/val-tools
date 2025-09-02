import { Component, computed, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { LogPlotService } from '../../services/log-plot/log-plot.service';
import { DatePipe } from '@angular/common';
import Plotly, { PlotData } from 'plotly.js-dist-min';
import { PlayerListService } from '../../services/player-list/player-list.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-log-plot',
  imports: [MatCard, MatCardContent, MatCardHeader, DatePipe, MatButtonModule],
  templateUrl: './log-plot.component.html',
  styleUrl: './log-plot.component.scss',
})
export class LogPlotComponent {
  dataService = inject(LogPlotService);
  playerService = inject(PlayerListService);

  plotReady = signal(false);

  dataListener = effect(() => {
    console.log('Data or parameters changed, regenerating plot if ready...');
    if (this.dataService.dataLoaded() && this.radius() && this.dateRange()) {
      this.generatePlot();
    }
  });

  @ViewChild('plot', { static: true }) plotEl!: ElementRef;

  radius = computed(() => this.dataService.radius);
  dateRange = computed(() => this.dataService.dateRange());

  generatePlot(): void {
    if (!this.dataService.dataLoaded()) {
      console.warn('Data not loaded yet. Cannot generate plot.');
      return;
    }
    const radius = this.radius()();
    const dateRange = this.dateRange();

    if (!radius) {
      console.warn('Radius not set. Cannot generate plot.');
      return;
    }
    if (!dateRange) {
      console.warn('Date range not set. Cannot generate plot.');
      return;
    }

    if (!this.plotEl) {
      console.error('Plot element not found.');
      return;
    }

    this.plotReady.set(false);

    const plotData: Partial<PlotData>[] = [];

    for (const [playerName, data] of Object.entries(this.dataService.positionTraces())) {
      console.log(`Processing player: ${playerName} with ${data.length} position entries`);
      if (
        this.playerService.disabledPlayers().length > 0 &&
        this.playerService.disabledPlayers().some((playerData) => playerData.name === playerName)
      ) {
        console.log(`Skipping disabled player: ${playerName}`);
        continue;
      }
      const sortedPositionData = data.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      const x = sortedPositionData.map((posTrace) => posTrace.x);
      const y = sortedPositionData.map((posTrace) => posTrace.y);
      const z = sortedPositionData.map((posTrace) => posTrace.z);
      const colour = sortedPositionData.map((posTrace) => new Date(posTrace.timestamp).getTime());

      const playerTraces: Partial<PlotData> = {
        x,
        y,
        z,
        type: 'scatter3d',
        mode: 'lines+markers',
        name: playerName,
        colorscale: 'Viridis',
        line: {
          color: colour,
          width: 2,
        },
        marker: {
          color: playerName,
          size: 3,
          colorscale: 'Viridis',
        },
      };

      plotData.push(playerTraces);
      console.log(`Added trace for player: ${playerName}`, playerTraces);
    }

    const observerCoordinates = this.dataService.observerCoordinates();

    if (observerCoordinates) {
      // Special point
      plotData.push({
        x: [observerCoordinates.x],
        y: [observerCoordinates.y],
        z: [observerCoordinates.z],
        mode: 'markers',
        type: 'scatter3d',
        name: 'Point of Interest',
        marker: { color: 'red', symbol: 'x', size: 2 },
      });
    }

    const layout: Partial<Plotly.Layout> = {
      title: { text: 'PLAYER LOCATIONS<br>(not a substitute for log review)' },
      scene: {
        camera: {
          eye: {
            x: 0.1,
            y: 2.5,
            z: 0.1,
          },
          up: {
            x: 0,
            y: 0,
            z: 1,
          },
        },
        xaxis: {
          title: { text: 'X Coordinates' },
          // range: [this.pointOfInterest.x - radius, this.pointOfInterest.x + radius],
        },
        yaxis: {
          title: { text: 'y Coordinates' },
          // range: [this.pointOfInterest.y - radius, this.pointOfInterest.y + radius],
        },
        zaxis: {
          title: { text: 'z Coordinates' },
          // range: [this.pointOfInterest.z - radius, this.pointOfInterest.z + radius],
        },
      },
      // shapes: [
      //   {
      //     type: 'circle',
      //     xref: 'x',
      //     yref: 'y',
      //     x0: this.pointOfInterest.x - radius,
      //     x1: this.pointOfInterest.x + radius,
      //     y0: zSpecial - radius,
      //     y1: zSpecial + radius,
      //     line: { color: 'red', dash: 'dot' },
      //   },
      // ],
    };

    Plotly.newPlot(this.plotEl.nativeElement, plotData, layout, { responsive: true });

    this.plotReady.set(true);
  }
}
