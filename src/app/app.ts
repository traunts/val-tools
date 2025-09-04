import { Component, signal } from '@angular/core';
import { LogPlotComponent } from './components/log-plot/log-plot.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MatCardModule } from '@angular/material/card';
import { FilterTabComponent } from './components/filter-tab/filter-tab.component';
import { CoordinateInputComponent } from './components/coordinate-input/coordinate-input.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    LogPlotComponent,
    FileUploadComponent,
    MatCardModule,
    FilterTabComponent,
    CoordinateInputComponent,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('val-tools');
}
