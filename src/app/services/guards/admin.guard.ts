import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from 'src/app/services/service.index';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public _userService: UserService) {
  }

  canActivate() {
    if (this._userService.user.role === 'ADMIN_ROLE') {
      return true
    } else {
      console.log('Blocked by guard')
      this._userService.logout()
      return false
    }
  }

}
