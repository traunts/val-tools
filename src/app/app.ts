import { Component, signal } from '@angular/core';
import { LogPlotComponent } from './components/log-plot/log-plot.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MatCardModule } from '@angular/material/card';
import { FilterTab } from './components/filter-tab/filter-tab';

@Component({
  selector: 'app-root',
  imports: [LogPlotComponent, FileUploadComponent, MatCardModule, FilterTab],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('val-tools');
}
