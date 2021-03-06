/*  Modules and declarations of pages folder and its components */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

// ng2-chart
import { ChartsModule } from 'ng2-charts';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalComponent } from './hospital/hospital.component';

import { BoosterComponent } from '../components/booster/booster.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UserComponent } from './user/user.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorsComponent } from './doctor/doctors.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graphs1Component,
    BoosterComponent,
    DoughnutChartComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UserComponent,
    HospitalComponent,
    DoctorComponent,
    DoctorsComponent,
    SearchComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graphs1Component
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule,
    CommonModule
  ]
})

export class PagesModule { }
