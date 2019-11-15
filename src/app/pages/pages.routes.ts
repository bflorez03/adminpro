/* Routes of pages module and its components are declared here */

import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorComponent } from './doctor/doctor/doctor.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account settings' } },
            { path: 'profile', component: ProfileComponent, data: { title: 'User profile' } },
            { path: 'graphs1', component: Graphs1Component, data: { title: 'Graphs' } },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },

            // Maintenance
            { path: 'users', component: UserComponent, data: { title: 'Users maintenance' } },
            { path: 'hospitals', component: HospitalComponent, data: { title: 'Hospitals maintenance' } },
            { path: 'doctors', component: DoctorComponent, data: { title: 'Doctors maintenance' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
