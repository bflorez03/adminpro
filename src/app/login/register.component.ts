import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

import swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function startPlugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  areEquals(field1: string, field2: string) {

    return (group: FormGroup): ValidationErrors => {
      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if (pass1 === pass2) {
        return null;
      }
      return { areEquals: true };
    };
  }

  ngOnInit() {
    startPlugins();

    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(Validators.required),
      confirmPassword: new FormControl(Validators.required),
      terms: new FormControl(false)
    }, { validators: this.areEquals('password', 'confirmPassword') });

    this.registerForm.setValue({
      name: 'Test',
      surname: 'SurTest',
      email: 'test@test.com',
      password: '123456',
      confirmPassword: '123456',
      terms: true
    });
  }

  signUpUser() {
    if (this.registerForm.invalid) { return; }
    if (!this.registerForm.value.terms) {
      swal('Important', 'Have to accept the terms of conditions', 'warning');
      return;
    }

    const user = new User(
      this.registerForm.value.name,
      this.registerForm.value.surname,
      this.registerForm.value.email,
      this.registerForm.value.password
    );

    this._userService.createUser(user)
      .subscribe(res => this.router.navigate(['login']));
  }

}
