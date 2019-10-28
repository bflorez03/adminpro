import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Main',
      icon: 'mdi mdi-gauge',
      subMenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'ProgressBar', url: '/progress' },
        { title: 'Graphs', url: '/graphs1' },
        { title: 'Promises', url: '/promises' },
        { title: 'Rxjs', url: '/rxjs' }
      ]
    }
  ];

  constructor() { }
}