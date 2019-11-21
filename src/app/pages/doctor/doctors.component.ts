import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from '../../services/service.index';
declare var swal: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  load: boolean;
  doctorsFrom: number;

  constructor(public _doctorService: DoctorService) {
    this.load = true;
    this.doctorsFrom = 0;
  }

  ngOnInit() {
    this.getTableDoctors();
  }

  getTableDoctors() {
    this._doctorService.getDoctors(this.doctorsFrom)
      .subscribe((doctors: Doctor[]) => {
        this.doctors = doctors;
        this.load = false;
      })
  }

  getDoctorsFrom(loadFrom: number) {
    const from = this.doctorsFrom + loadFrom;

    if (from < 0) {
      return;
    }
    if (from >= this._doctorService.totalDoctors) {
      return;
    }

    this.doctorsFrom += loadFrom;
    this.getTableDoctors();
  }

  searchDoctor(keyword: string) {
    this.load = true;
    if (keyword.length <= 0) {
      this.getTableDoctors();
      return;
    }
    this._doctorService.getDoctorsByKeyword(keyword)
      .subscribe((doctors) => {
        this.doctors = doctors;
        this.load = false;
      })
  }

  deleteDoctor(doctor: Doctor) {
    console.log(doctor);
    swal({
      title: 'Are you sure?',
      text: 'You will delete doctor: ' + doctor.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          this._doctorService.deleteDoctor(doctor._id)
            .subscribe((doctorDeleted: Doctor) => {
              swal('Doctor: ' + doctorDeleted.name + 'has been deleted!',
                { icon: 'success' })
              this.getTableDoctors();
            });
        }
      })
  }
}
