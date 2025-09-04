import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LogPlotService } from '../../services/log-plot/log-plot.service';
@Component({
  selector: 'app-coordinate-input',
  imports: [MatFormFieldModule, MatCardModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './coordinate-input.component.html',
  styleUrl: './coordinate-input.component.scss',
})
export class CoordinateInputComponent implements OnInit {
  logPlotService = inject(LogPlotService);

  observerCoordinates = new FormGroup({
    obsX: new FormControl<number | null>(null),
    obsY: new FormControl<number | null>(null),
    obsZ: new FormControl<number | null>(null),
  });

  ngOnInit() {
    this.observerCoordinates.valueChanges.subscribe((coords) => {
      console.log('Observer coordinates changed:', coords);
      // Use loose inequality to check for null or undefined, but allow 0
      if (coords.obsX != null && coords.obsY != null && coords.obsZ != null) {
        console.log('Setting observer coordinates in LogPlotService:', coords);
        this.logPlotService.setObserverCoordinates(coords.obsX, coords.obsY, coords.obsZ);
      }
    });
  }

  pasteCoordinates(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const pastedText = clipboardData.getData('text');
      console.log('Pasted text:', pastedText);
      const coords = pastedText
        .split(/[\s,]+/)
        .map((coord) => parseFloat(coord.trim()))
        .filter((coord) => !isNaN(coord));
      if (coords.length === 3 && coords.every((coord) => !isNaN(coord))) {
        this.observerCoordinates.setValue({
          obsX: coords[0],
          obsY: coords[1],
          obsZ: coords[2],
        });
      }
    }
  }
}
