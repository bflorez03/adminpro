import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    urlTheme: 'assets/css/colors/default.css',
    theme: 'default'
  };

  // tslint:disable-next-line: variable-name
  constructor(@Inject(DOCUMENT) private _document) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    } else {
    }
    this.applyTheme(this.settings.theme);
  }

  applyTheme(theme: string) {
    let url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
    this.settings.urlTheme = url;
    this.settings.theme = theme;
    this.saveSettings();
  }
}

interface Settings {
  urlTheme: string;
  theme: string;
}
