import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphs1',
  templateUrl: './graphs1.component.html',
  styles: []
})
export class Graphs1Component implements OnInit {

  graphs: any = {
    graph1: {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data: [24, 30, 46],
      type: 'doughnut',
      legend: 'El pan se come con'
    },
    graph2: {
      labels: ['Hombres', 'Mujeres'],
      data: [4500, 6000],
      type: 'doughnut',
      legend: 'Entrevistados'
    },
    graph3: {
      labels: ['Si', 'No'],
      data: [95, 5],
      type: 'doughnut',
      legend: '¿Le dan gases los frijoles?'
    },
    graph4: {
      labels: ['No', 'Si'],
      data: [85, 15],
      type: 'doughnut',
      legend: '¿Le importa que le den gases?'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
