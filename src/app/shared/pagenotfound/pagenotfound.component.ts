import { Component, OnInit } from '@angular/core';

declare function startPlugins();
@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {
  year: number = new Date().getFullYear()

  constructor() { }

  ngOnInit() {
    startPlugins();
  }

}
