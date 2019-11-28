import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  /*   menu: any = [
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
      },
      {
        title: 'Maintenance',
        icon: 'mdi mdi-account-settings-variant',
        subMenu: [
          { title: 'Users', url: '/users' },
          { title: 'Doctors', url: '/doctors' },
          { title: 'Hospitals', url: '/hospitals' }
        ]
      }
    ]; */

  menu: any[] = []

  constructor(public _userService: UserService) {
  }

  setMenu() {
    this.menu = this._userService.menu
  }
}
