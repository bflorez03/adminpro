import { Component, OnInit } from '@angular/core';

// Help to start plugins and Scripts outside Angular
declare function startPlugins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    startPlugins();
  }

}
