import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorService, HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from '../../models/doctor.model';
import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {
  hospitals: Hospital[] = [];
  doctor: Doctor = new Doctor('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _doctorService: DoctorService,
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      if (id !== 'new') {
        this.getDoctor(id);
      }
    })
  }

  ngOnInit() {
    this.getHospitals();
    this._modalUploadService.emitter
      .subscribe(res => this.doctor.img = res.element.img)
  }

  saveDoctor(f: NgForm) {
    if (!f.valid) {
      return
    }
    this._doctorService.saveDoctor(this.doctor)
      .subscribe((doctor: any) => {
        this.doctor._id = doctor._id;
        this.router.navigate(['/doctor', doctor._id]);
      })
  }

  getDoctor(id: string) {
    this._doctorService.getDoctorById(id)
      .subscribe(doctor => {
        this.doctor = doctor;
        this.doctor.hospital = doctor.hospital._id;
        this.hospitalChange(this.doctor.hospital);
      });
  }

  getHospitals() {
    this._hospitalService.getHospitals()
      .subscribe((res: any) => this.hospitals = res.hospitals);
  }

  hospitalChange(idHospital: string) {
    this._hospitalService.getHospitalById(idHospital)
      .subscribe((loadedHospital: Hospital) => this.hospital = loadedHospital)
  }

  updatePicture() {
    this._modalUploadService.showModal(this.doctor._id, 'doctor');

  }
}
