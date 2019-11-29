/* Routes of pages module and its components are declared here */

import { Routes, RouterModule } from '@angular/router';

// Guards
import { AdminGuard } from '../services/service.index';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorsComponent } from './doctor/doctors.component';
import { DoctorComponent } from './doctor/doctor.component';
import { SearchComponent } from './search/search.component';
import { CheckTokenGuard } from '../services/guards/check-token.guard';

const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CheckTokenGuard],
    data: { title: 'Dashboard' }
  },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account settings' } },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [CheckTokenGuard],
    data: { title: 'User profile' }
  },
  { path: 'graphs1', component: Graphs1Component, data: { title: 'Graphs' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
  { path: 'search/:keyword', component: SearchComponent, data: { title: 'Searcher' } },

  // Maintenance
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AdminGuard, CheckTokenGuard],
    data: { title: 'Users maintenance' }
  },
  {
    path: 'hospitals',
    component: HospitalComponent,
    canActivate: [CheckTokenGuard],
    data: { title: 'Hospitals maintenance' }
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    canActivate: [CheckTokenGuard],
    data: { title: 'Doctors maintenance' }
  },
  {
    path: 'doctor/:id',
    component: DoctorComponent,
    canActivate: [CheckTokenGuard],
    data: { title: 'Update doctor' }
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
