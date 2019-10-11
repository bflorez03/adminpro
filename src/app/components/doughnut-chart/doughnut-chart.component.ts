import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: []
})
export class DoughnutChartComponent implements OnInit {

  @Input() chartLabels: Label[];
  @Input() chartData: MultiDataSet;
  @Input() chartType: string;
  @Input() legend: string;

  constructor() { }

  ngOnInit() {
  }
}
