import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Doctor } from '../../models/doctor.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  totalDoctors: number = 0;
  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) { }

  getDoctors(from: number = 0) {
    const url = URL_SERVICES + '/doctor?from=' + from;
    return this.http.get(url)
      .pipe(map((res: any) => {
        this.totalDoctors = res.totalDoctors;
        return res.doctors;
      }));
  }

  getDoctorById(id: string) {
    const url = URL_SERVICES + '/doctor/' + id;
    return this.http.get(url)
      .pipe(map((res: any) => res.elementLoaded))
  }

  getDoctorsByKeyword(keyword: string) {
    const url = URL_SERVICES + '/search/collection/doctor/' + keyword;
    return this.http.get(url)
      .pipe(map((res: any) => res.doctor));
  }

  deleteDoctor(id: string) {
    let url = URL_SERVICES + '/doctor/' + id;
    url += '?token=' + this._userService.token;
    return this.http.delete(url)
      .pipe(map(((res: any) => {
        return res.doctor
      })))
  }

  saveDoctor(doctor: Doctor) {
    if (doctor._id) {
      let url = URL_SERVICES + '/doctor/' + doctor._id;
      url += '?token=' + this._userService.token;
      return this.http.put(url, doctor)
        .pipe(map((res: any) => {
          swal('Doctor updated!', res.doctor.name, 'success');
          return res.doctor
        }))
    } else {
      const url = URL_SERVICES + '/doctor?token=' + this._userService.token;
      return this.http.post(url, doctor)
        .pipe(map((res: any) => {
          swal('Doctor created!', res.doctor.name, 'success');
          return res.doctor
        }))
    }
  }

}
