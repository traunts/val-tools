import { Component } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardLgImage,
} from '@angular/material/card';

@Component({
  selector: 'app-log-plot',
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardLgImage],
  templateUrl: './log-plot.component.html',
  styleUrl: './log-plot.component.scss',
})
export class LogPlotComponent {}
