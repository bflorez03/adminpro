import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/service.index';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  users: User[] = [];
  usersFrom: number;
  totalUsers: number;
  load: boolean;

  constructor(public _userService: UserService) {
    this.usersFrom = 0;
    this.totalUsers = 0;
    this.load = true;
  }

  ngOnInit() {
    this.getTableUsers();
  }

  getTableUsers() {
    this._userService.getUsers(this.usersFrom)
      .subscribe((res: any) => {
        this.totalUsers = res.totalUsers;
        this.users = res.Users;
        this.load = false;
      });
  }

  getUsersFrom(loadFrom: number) {
    const from = this.usersFrom + loadFrom;

    if (from < 0) {
      return;
    }
    if (from >= this.totalUsers) {
      return;
    }

    this.usersFrom += loadFrom;
    this.getTableUsers();
  }

  searchUser(keyword: string) {
    this.load = true;
    if (keyword.length <= 0) {
      this.getTableUsers();
      return;
    }

    this._userService.getUsersByKeyword(keyword)
      .subscribe((users: User[]) => {
        this.users = users;
        this.load = false;
        console.log(users);
      });
  }


}
