import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(public _settings: SettingsService) { }

  ngOnInit() {
    this.putCheck();
  }

  changeColor(theme: string, link: any) {
    this.applyCheck(link);
    this._settings.applyTheme(theme);
  }

  applyCheck(link: any) {
    // tslint:disable-next-line: prefer-const
    let selectors: any = document.getElementsByClassName('selector');
    // tslint:disable-next-line: prefer-const
    for (let selector of selectors) {
      selector.classList.remove('working');
    }
    link.classList.add('working');
  }

  putCheck() {
    let selectors: any = document.getElementsByClassName('selector');
    for (let selector of selectors) {
      if (selector.getAttribute('data-theme') === this._settings.settings.theme) {
        selector.classList.add('working');
        break;
      }
    }
  }

}
