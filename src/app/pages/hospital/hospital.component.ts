import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {
  hospitals: Hospital[] = [];
  totalHospitals: number;
  hospitalsFrom: number;
  load: boolean;

  constructor(public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) {
    this.totalHospitals = 0;
    this.hospitalsFrom = 0;
    this.load = true;
  }

  ngOnInit() {
    this.getTableHospitals();
    this._modalUploadService.emitter
      .subscribe(res => this.getTableHospitals())
  }

  // Get the data to display the list of hospitals on DB
  getTableHospitals() {
    this._hospitalService.getHospitals(this.hospitalsFrom)
      .subscribe((res: any) => {
        this.hospitals = res.hospitals;
        this.totalHospitals = res.totalHospitals;
        this.load = false;
      });
  }

  // Search hospital by a keyword typed from the user
  searchHospital(keyword: string) {
    this.load = true;
    if (keyword.length <= 0) {
      this.getTableHospitals();
      return;
    }

    this._hospitalService.getHospitalsByKeyword(keyword)
      .subscribe((hospitals) => {
        this.hospitals = hospitals;
        this.load = false;
      })
  }

  // Update hospital information
  saveHospital(hospital: Hospital) {
    this._hospitalService.updateHospital(hospital)
      .subscribe((hospitalUpdated: Hospital) => {
        swal(`Hospital: ${hospitalUpdated.name} updated!`, '', 'success')
      })
  }

  // Delete hospital from DB
  deleteHospital(hospital: Hospital) {
    swal({
      title: 'Are you sure?',
      text: 'You will delete hospital: ' + hospital.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          this._hospitalService.deleteHospital(hospital._id)
            .subscribe((hospitalDeleted: Hospital) => {
              swal('Hospital: ' + hospitalDeleted.name + 'has been deleted!',
                { icon: 'success' })
              this.getTableHospitals();
            });
        }
      })
  }

  // Help to do the pagination of the table
  getHospitalsFrom(loadFrom: number = 0) {
    const from = this.hospitalsFrom + loadFrom;

    if (from < 0) {
      return;
    }
    if (from >= this.totalHospitals) {
      return;
    }

    this.hospitalsFrom += loadFrom;
    this.getTableHospitals();
  }

  // Create a new hospital and store in the DB
  createHospital() {
    swal("Write the name of the new hospital:", {
      content: "input",
    })
      .then((value: string) => {
        if (value.length <= 0) {
          swal('Error, you didn\'t type a name.', '', 'warning');
          return
        }
        this._hospitalService.getHospitalsByKeyword(value)
          .subscribe((res: Hospital[]) => {
            if (res.length > 0) {
              swal('Error, this hospital already exists', '', 'error');
              return
            }
            this._hospitalService.createHospital(value)
              .subscribe((hospitalCreated: Hospital) => {
                swal(`Hospital: ${hospitalCreated.name} created!`, '', 'success');
                this.getTableHospitals();
              })
          });

      });

    console.log('Create hospital works!');
  }

  // Call modal to update hospital picture
  callModalUpload(hospital: Hospital) {
    this._modalUploadService.showModal(hospital._id, 'hospital');
  }

}
