import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { URL_SERVICES } from 'src/app/config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {
    console.log('Service ready to use');
  }

  login(user: User, rememberUser: boolean = false) {
    return this.http.post(URL_SERVICES + '/login', user);
  }

  createUser(user: User) {
    return this.http.post(URL_SERVICES + '/user', user)
      .pipe(map((res: any) => {
        swal('User created', user.email, 'success');
        return res.user;
      }));
  }
}
