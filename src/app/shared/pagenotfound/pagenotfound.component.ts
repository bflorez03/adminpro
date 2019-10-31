import { Component, OnInit } from '@angular/core';

declare function startPlugins();
@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styles: []
})
export class PagenotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    startPlugins();
  }

}
