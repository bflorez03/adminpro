import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function startPlugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberMe: boolean = false;

  constructor(
    public router: Router,
    public _userService: UserService
  ) { }

  ngOnInit() {
    startPlugins();
  }

  login(form: NgForm) {
    if (form.invalid) { return; }
    const user = new User(null, null, form.value.email, form.value.password);
    this._userService.login(user, form.value.rememberMe)
      .subscribe(res => console.log('Response :', res));


    // console.log('Valid: ', form.valid);
    // console.log('Data: ', form.value);
    // this.router.navigate(['/dashboard']);
  }

}
