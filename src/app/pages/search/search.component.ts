import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = []
  doctors: Doctor[] = []
  hospitals: Hospital[] = []
  keyword: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
      .subscribe(params => {
        this.keyword = params['keyword']
        this.search(this.keyword)
      });
  }

  ngOnInit() {
  }

  search(keyword: string) {
    const url = URL_SERVICES + '/search/all/' + keyword
    this.http.get(url)
      .subscribe((res: any) => {
        this.users = res.users
        this.doctors = res.doctors
        this.hospitals = res.hospitals
      })
  }

}
