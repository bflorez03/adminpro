import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  UploadFileService,
  HospitalService,
  DoctorService,
  LoginGuardGuard,
  AdminGuard
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    DoctorService,
    LoginGuardGuard,
    AdminGuard
  ]
})
export class ServiceModule { }
