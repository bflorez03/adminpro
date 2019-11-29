import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { URL_SERVICES } from 'src/app/config/config';
import { Router } from '@angular/router';
import { UploadFileService } from '../uploadFile/upload-file.service';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string;
  user: User;
  menu: any;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService) {
    this.loadStorage();
  }


  // Check token to know if there is a user logged
  isLogged = () => (this.token.length > 3) ? true : false;

  // Logout function, reset token and user values from local store and redirect page
  logout() {
    this.token = ''
    this.user = null
    this.menu = []
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('menu')
    this.router.navigate(['/login'])
  }

  // Check if there is data in the storage and load it
  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = []
    }
  }

  // Function to save logged user into local storage
  saveLocalStorage(id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('menu', JSON.stringify(menu))
    this.token = token
    this.user = user
    this.menu = menu
  }

  renewToken() {
    const url = URL_SERVICES + '/login/renewToken?token=' + this.token
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          this.token = res.token
          localStorage.setItem('token', res.token)
          return true
        }),
        catchError(err => {
          swal('Error renewing token!', 'It was not possible to renew the token ', 'error')
          this.router.navigate(['/login'])
          return throwError(err);
        })
      )
  }

  // POST request to do login with a google account
  loginByGoogle(token: string) {
    // POST method need a object as a body, and token is string for that reason {token}
    return this.http.post(URL_SERVICES + '/login/google', { token })
      .pipe(
        map((res: any) => {
          this.saveLocalStorage(res.id, res.token, res.user, res.menu);
          return true;
        }),
        catchError(this.handleError)
      )
  }

  // POST request to do normal login
  login(user: User, rememberUser: boolean = false) {
    if (rememberUser) {
      localStorage.setItem('email', user.email);
    } else { localStorage.removeItem('email'); }

    return this.http.post(URL_SERVICES + '/login', user)
      .pipe(
        map((res: any) => {
          this.saveLocalStorage(res.id, res.token, res.user, res.menu);
          return true;
        }),
        catchError(this.handleError)
      )
  }

  // Error handler: shows to users the error occurred
  handleError(error: HttpErrorResponse) {
    console.log('Error: ', error);
    swal('Error', error.error.message, 'error')
    return throwError(error);
  }

  // POST request to create new user into DB
  createUser(user: User) {
    return this.http.post(URL_SERVICES + '/user', user)
      .pipe(
        map((res: any) => {
          swal('User created', user.email, 'success');
          return res.elementCreated;
        }), catchError(err => {
          swal('Error', err.error.errors.message, 'error')
          return throwError(err);
        })
      );
  }

  // PUT request to update user
  updateUser(user: User) {
    const url = URL_SERVICES + '/user/' + user._id + '?token=' + this.token;
    return this.http.put(url, user)
      .pipe(map((res: any) => {
        if (user._id === this.user._id) {
          this.saveLocalStorage(res.id, res.token, res.user, res.menu);
        }
        swal('User updated', user.name, 'success');
        return true;
      }));
  }

  // Update user image
  updateImage(image: File, id: string) {
    this._uploadFileService.uploadFile(image, 'user', id)
      .then((res: any) => {
        this.user.img = res.element.img;
        swal('Image updated', this.user.name, 'success');
        this.saveLocalStorage(id, this.token, res.element, this.menu);
      }).catch(error => console.log('error: ', error));
  }

  // Get users from DB
  getUsers(from: number = 0) {
    const url = URL_SERVICES + '/user?from=' + from;
    return this.http.get(url);
  }

  // Get users by keyword
  getUsersByKeyword(keyword: string) {
    const url = URL_SERVICES + '/search/collection/user/' + keyword;
    return this.http.get(url)
      .pipe(map((res: any) => res.user));
  }

  // Delete user by user id
  deleteUser(userID: string) {
    const url = URL_SERVICES + '/user/' + userID + '?token=' + this.token;
    return this.http.delete(url)
      .pipe(map((res: any) => res.elementDeleted));
  }

}
