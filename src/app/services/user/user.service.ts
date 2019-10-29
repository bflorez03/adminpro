import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { URL_SERVICES } from 'src/app/config/config';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string;
  user: User;

  constructor(
    public http: HttpClient,
    public router: Router) {
    this.loadStorage();
  }

  // Check if there is data in the storage and load it
  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  // Check token to know if there is a user logged
  isLogged = () => (this.token.length > 3) ? true : false;

  // Function to save logged user into local storage
  saveLocalStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  // POST request to do login with a google account
  loginByGoogle(token: string) {
    // POST method need a object as a body, and token is string for that reason {token}
    return this.http.post(URL_SERVICES + '/login/google', { token })
      .pipe(map((res: any) => {
        this.saveLocalStorage(res.id, res.token, res.userSaved);
        return true;
      }));
  }

  // POST request to do normal login
  login(user: User, rememberUser: boolean = false) {
    if (rememberUser) {
      localStorage.setItem('email', user.email);
    } else { localStorage.removeItem('email'); }

    return this.http.post(URL_SERVICES + '/login', user)
      .pipe(map((res: any) => {
        this.saveLocalStorage(res.id, res.token, res.userSaved);
        return true;
      }));
  }

  // POST request to create new user into DB
  createUser(user: User) {
    return this.http.post(URL_SERVICES + '/user', user)
      .pipe(map((res: any) => {
        swal('User created', user.email, 'success');
        return res.user;
      }));
  }

  // Logout function, reset token and user values from local store and redirect page
  logout() {
    this.token = '';
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
