import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function startPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  rememberMe: boolean = false;
  auth2: any;

  constructor(
    public router: Router,
    public _userService: UserService
  ) { }

  ngOnInit() {
    startPlugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.rememberMe = true;
    }

  }

  // Google singIn functions
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '482841113353-sdild5h9saqvr16rlfjnmikkq8nt2pam.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSingIn(document.getElementById('btnGoogle'));
    });
  }

  attachSingIn(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._userService.loginByGoogle(token)
        .subscribe(() => window.location.href = '#/dashboard'); // Router doesn't refresh the page properly
    });
  }

  // Normal login by credentials
  login(form: NgForm) {
    if (form.invalid) { return; }
    const user = new User(null, null, form.value.email, form.value.password);
    this._userService.login(user, form.value.rememberMe)
      .subscribe(() => this.router.navigate(['/dashboard']));
  }

}
