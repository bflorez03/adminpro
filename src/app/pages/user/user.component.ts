import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/service.index';
// import * from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;
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

  constructor(public _userService: UserService,
    public _modalUploadService: ModalUploadService) {
    this.usersFrom = 0;
    this.totalUsers = 0;
    this.load = true;
  }

  ngOnInit() {
    this.getTableUsers();
    this._modalUploadService.emitter
      .subscribe(res => this.getTableUsers());
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

  // Delete an user from the table
  // It's not possible delete the logged user
  deleteUser(user: User) {
    if (user._id === this._userService.user._id) {
      swal('Error deleting user', 'It\'s not possible to delete your own user', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'You will delete user ' + user.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          this._userService.deleteUser(user._id)
            .subscribe((userDeleted: User) => {
              swal('User: ' + userDeleted.name + ' has been deleted!', {
                icon: 'success',
              });
              this.getTableUsers();
            });
        }
      });

  }

  // Update user information
  saveUser(user: User) {
    swal({
      title: 'Are you sure?',
      text: 'You will update info of user ' + user.name,
      icon: 'warning',
      buttons: true
    })
      .then(update => {
        if (update) {
          this._userService.updateUser(user)
            .subscribe(() => this.getTableUsers());
        }
      });
  }

  // Call Modal to update user picture
  callModalUpload(user: User) {
    this._modalUploadService.showModal(user._id, 'user');
  }
}
