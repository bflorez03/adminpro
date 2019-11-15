import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital: Hospital;
  token: string;

  constructor(
    public router: Router,
    public http: HttpClient) {
    this.loadToken();
  }

  loadToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  getHospitals(from: number = 0) {
    const url = URL_SERVICES + '/hospital?from=' + from;
    return this.http.get(url);
  }

  getHospitalById(id: string) {
    const url = URL_SERVICES + '/hospital/' + id;
    return this.http.get(url)
      .pipe(map((res: any) => res.elementLoaded));
  }

  // Get hospitals by keyword
  getHospitalsByKeyword(keyword: string) {
    const url = URL_SERVICES + '/search/collection/hospital/' + keyword;
    return this.http.get(url)
      .pipe(map((res: any) => res.hospital));
  }

  createHospital(name: string) {
    const url = URL_SERVICES + '/hospital' + '?token=' + this.token;
    return this.http.post(url, { name })
      .pipe(map((res: any) => res.hospital))
  }

  deleteHospital(id: string) {
    const url = URL_SERVICES + '/hospital/' + id + '?token=' + this.token;
    return this.http.delete(url)
      .pipe(map((res: any) => res.hospitalDeleted));
  }

  updateHospital(hospital: Hospital) {
    const url = URL_SERVICES + '/hospital/' + hospital._id + '?token=' + this.token;
    return this.http.put(url, hospital)
      .pipe(map((res: any) => res.hospital))
  }
}
