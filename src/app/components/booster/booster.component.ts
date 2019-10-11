import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-booster',
  templateUrl: './booster.component.html',
  styles: []
})
export class BoosterComponent implements OnInit {

  @ViewChild('progress', { static: false }) progress: ElementRef;
  @Input() legend: string;
  @Input() percent: number;
  @Output() valueChanged: EventEmitter<number> = new EventEmitter();

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  onChanges(newValue: number) {
    if (newValue >= 100) {
      this.percent = 100;
    } else if (newValue <= 0 || newValue === null) {
      this.percent = 0;
    } else { this.percent = newValue; }
    console.log(this.percent);
    this.renderer.setProperty(this.progress.nativeElement, 'value', this.percent);
    this.valueChanged.emit(this.percent);
  }

  changeValue(value: number) {
    if ((value > 0 && this.percent < 100) || (value < 0 && this.percent > 0)) {
      this.percent += value;
    }
    this.valueChanged.emit(this.percent);
    this.progress.nativeElement.focus();
  }
}
