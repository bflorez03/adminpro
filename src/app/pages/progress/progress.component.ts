import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  percent1: number;
  percent2: number;

  constructor() {
    this.percent1 = 30;
    this.percent2 = 40;
  }

  ngOnInit() {
  }
}
