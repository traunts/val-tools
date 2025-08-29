import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { LogPlotComponent } from './components/log-plot/log-plot.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [PlayerListComponent, LogPlotComponent, FileUploadComponent, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('val-tools');
}
